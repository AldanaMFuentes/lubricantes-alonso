import axios from "axios";

const actions = {
  async getProducts(context, payload) {
    const apiUrlBase = "https://alonso-lubricantes-backend-7bee12fee9d8.herokuapp.com";
    const apiUrl = `${apiUrlBase}/auth?` +
    `${payload.denominacion ? '&denominacion=' + payload.denominacion : ''}` +
    `${payload.minimo ? '&min=' + payload.minimo : ''}` +
    `${payload.maximo ? '&max=' + payload.maximo : ''}` +
    `${payload.page ? '&page=' + payload.page : ''}`;
    const response = await axios.get(apiUrl);
    return response.data;
  },
};

export default actions;
