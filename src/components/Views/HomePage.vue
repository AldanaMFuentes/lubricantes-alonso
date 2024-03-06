<template>
  <div class="pa-4 mr-10">
    <v-row>
      <!-- columna menú -->
      <v-col cols="2">
        <v-row
          v-for="(item, index) in itemsMenu"
          :key="index"
          class="btn-row mt-1 mb-1"
        >
          <button
            text
            flat
            class="text-button v-btn-menu"
            @click="clearFilters()"
            v-if="!isMobile"
          >
            {{ item }}
          </button>
        </v-row>
      </v-col>

      <v-divider vertical class="menu-divider" v-if="!isMobile"></v-divider>

      <!-- columna contenido -->
      <v-col :cols="10">
        <!-- filtros -->
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-container
                class="pt-0"
                :class="{ 'pb-0': !showFilters, 'pb-4': showFilters }"
              >
                <div class="text-overline ml-1 pt-2">Filtros</div>
                <v-card-actions>
                  <v-row>
                    <v-col cols="12" class="pa-0">
                      <!-- chips con filtros seleccionados -->
                      <v-container
                        v-if="
                          filtersApplied &&
                          filtersApplied.length > 0 &&
                          !showFilters
                        "
                        class="pl-1 pt-1 pb-4"
                      >
                        <v-chip
                          v-for="(filter, key) in filtersApplied"
                          class="mr-2"
                          label
                          outlined
                          color="primary"
                          :key="key"
                          @click="showFilters = true"
                        >
                          {{
                            `${filter.label}: ${
                              Array.isArray(filter.model)
                                ? getTextWhenFilterIsArray(filter)
                                : filter.model
                            }`
                          }}
                        </v-chip>
                      </v-container>
                    </v-col>
                  </v-row>
                </v-card-actions>
                <v-expand-transition>
                  <v-form
                    v-show="showFilters"
                    v-model="isFormValid"
                    ref="filters-form"
                    id="filters-form"
                    @submit.prevent="applyFilters()"
                  >
                    <v-row>
                      <v-col
                        :cols="isMobile ? 12 : 6"
                        class="pb-0 pt-0"
                        :lg="6"
                        :md="6"
                        :sm="12"
                        :xs="12"
                      >
                        <v-text-field
                          label="Denominación"
                          v-model="inputDenominacion"
                          clearable
                          :rules="[rules.maxLength(inputDenominacion, 100)]"
                          outlined
                        >
                          <template v-slot:append>
                            <v-btn icon class="pb-3 pl-2 search-icon">
                              <v-icon>{{ searchIcon }}</v-icon>
                            </v-btn></template
                          ></v-text-field
                        >
                      </v-col>
                      <v-col
                        :cols="isMobile ? 12 : 3"
                        class="pb-0 pt-0"
                        :lg="3"
                        :md="3"
                        :sm="6"
                        :xs="12"
                      >
                        <v-text-field
                          label="Precio mínimo"
                          v-model="precioMin"
                          clearable
                          :rules="[
                            rules.numericValue(precioMin),
                            rules.validPriceRange(precioMin, precioMax),
                          ]"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col
                        :cols="isMobile ? 12 : 3"
                        class="pb-0 pt-0"
                        :lg="3"
                        :md="3"
                        :sm="6"
                        :xs="12"
                      >
                        <v-text-field
                          label="Precio máximo"
                          v-model="precioMax"
                          clearable
                          :rules="[
                            rules.numericValue(precioMax),
                            rules.validPriceRange(precioMin, precioMax),
                          ]"
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row class="text-right py-0">
                      <v-col cols="12" class="pt-0">
                        <v-tooltip left>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              icon
                              color="grey"
                              v-bind="attrs"
                              v-on="on"
                              class="mr-5 px-1 py-1"
                              size="25px"
                              @click="clearFilters"
                              id="v-icon-limpiarFiltros"
                            >
                              <v-icon>{{ clearFiltersIcon }}</v-icon></v-btn
                            >
                          </template>
                          <span> Limpiar filtros</span></v-tooltip
                        >
                        <v-btn
                          color="primary"
                          type="submit"
                          form="filters-form"
                          id="v-btn-aplicar"
                          :disabled="
                            !inputDenominacion && !precioMin && !precioMax
                          "
                        >
                          Aplicar
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-expand-transition>
              </v-container>
            </v-card>
          </v-col>
        </v-row>

        <!-- cards -->
        <v-row>
          <v-container v-if="isLoading">
            <v-row v-for="row in 3" :key="row" class="products-row">
              <v-col
                v-for="col in 3"
                :key="col"
                class="mr-1"
                :cols="isMobile ? 12 : 4"
                :lg="4"
                :md="4"
                :sm="6"
                :xs="12"
              >
                <v-skeleton-loader
                  type="card"
                  min-height="300px"
                ></v-skeleton-loader>
              </v-col>
            </v-row>
          </v-container>
          <ProductsCards
            v-show="!isLoading"
            v-for="product in products"
            :key="product.id"
            :denominacion="product.denominacion"
            :precio="product.precio"
            :stock="product.stock"
            :image="product.image"
          />
        </v-row>

        <!-- paginador -->
        <v-row justify="center">
          <v-col cols="8">
            <v-container>
              <v-pagination
                v-model="page"
                :length="this.totalPages"
                active-color="primary"
                class="the-paginator"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import enums from "@/utils/enums/index";
import rules from "@/utils/helpers/rules";
import ProductsCards from "@/components/UI/ProductsCards.vue";
import { mapActions } from "vuex";

export default {
  name: "HomePage",
  components: {
    ProductsCards,
  },
  data() {
    return {
      itemsMenu: ["catálogo"],
      clearFiltersIcon: enums.icons.CLEAR_FILTERS,
      downArrowIcon: enums.icons.DOWN_ARROW_ICON,
      upArrowIcon: enums.icons.UP_ARROW_ICON,
      showFilters: true,
      filtersApplied: [],
      rules: rules,
      inputDenominacion: null,
      precioMin: null,
      precioMax: null,
      isFormValid: true,
      products: [],
      searchIcon: enums.icons.SEARCH,
      isLoading: false,
      page: 1,
      totalPages: 1,
    };
  },
  created() {
    this.loadProducts();
  },
  watch: {
    inputDenominacion(newValue) {
      if (!newValue && !this.precioMin && !this.precioMax) {
        this.loadProducts();
      }
    },
    precioMin(newValue) {
      if (!newValue && !this.inputDenominacion && !this.precioMax) {
        this.loadProducts();
      }
    },
    precioMax(newValue) {
      if (!newValue && !this.inputDenominacion && !this.precioMin) {
        this.loadProducts();
      }
    },
    page: {
      handler: "loadProducts",
      immediate: true,
    },
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
  methods: {
    ...mapActions({
      getProducts: "products/getProducts",
    }),
    customizeFiltersApplied() {
      this.filtersApplied = [];
      if (this.inputDenominacion) {
        this.filtersApplied.push({
          key: "denominacion",
          label: "Denominación",
          model: this.inputDenominacion,
        });
      }
      if (this.precioMin) {
        this.filtersApplied.push({
          key: "precioMin",
          label: "Precio mínimo",
          model: `$${this.precioMin}`,
        });
      }
      if (this.precioMax) {
        this.filtersApplied.push({
          key: "precioMax",
          label: "Precio máximo",
          model: `$${this.precioMax}`,
        });
      }
    },
    getTextWhenFilterIsArray(currentFilter) {
      if (currentFilter.model.length > 0 && currentFilter.model.length <= 3) {
        return currentFilter.model.map((m) => {
          return m.value ? m.value : m;
        });
      }
      if (currentFilter.model.length > 3) {
        let totalFiltros = currentFilter.model.length - 3;
        let firstThree = currentFilter.model.slice(0, 3).map((f) => {
          return f.value ? f.value : f;
        });
        return `${firstThree} y ${totalFiltros} más`;
      }
    },
    clearFilters() {
      this.inputDenominacion = this.precioMin = this.precioMax = null;
      this.showFilters = true;
      this.loadProducts();
    },
    async applyFilters() {
      this.showFilters = false;
      this.customizeFiltersApplied();
      this.page = 1;
      this.loadProducts();
    },
    async loadProducts() {
      this.isLoading = true;
      const payload = {
        denominacion: this.inputDenominacion,
        minimo: this.precioMin,
        maximo: this.precioMax,
        page: this.page - 1,
      };
      const res = await this.getProducts(payload);
      this.products = res.content;
      this.totalPages = res.totalPages;
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.v-btn-menu:hover {
  color: #1976d2;
}
.btn-row {
  justify-content: end;
  margin-right: 10px;
}
.menu-divider {
  min-height: 1250px;
  height: auto;
  border-right: 1px solid rgba(0, 0, 0, 0.6);
}
.text-overline {
  font-size: 15px !important;
}
.search-icon {
  cursor: default;
}
.search-icon:before {
  background-color: transparent;
}
.products-row {
  flex-wrap: nowrap;
}
::v-deep .v-pagination__item {
  box-shadow: none;
  border-radius: 20px;
}
::v-deep .v-pagination__navigation {
  box-shadow: none;
}
</style>
