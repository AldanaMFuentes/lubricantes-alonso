const rules = {
  validPriceRange: (precioMin, precioMax) => {
    if (precioMin && precioMax) {
      return precioMin <= precioMax || "Rango de precios no válido";
    }
  },
  maxLength: (value, limit) => {
    return (value) =>
      !value || `${value}`.length <= limit || `Máximo ${limit} caracteres`;
  },
  numericValue: (value) => {
    if (value) {
      const numericRegex = /^[0-9]+$/;
      return numericRegex.test(value) || "Solo se permiten valores numéricos";
    }
  },
};

export default rules;
