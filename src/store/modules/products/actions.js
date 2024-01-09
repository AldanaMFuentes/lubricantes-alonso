import axios from "axios";

const actions = {
  async getProducts(context, denominacion, minimo, maximo) {
    // const apiUrlBase = "https://alonso-lubricantes-backend-7bee12fee9d8.herokuapp.com";
    const apiUrlBase = "http://localhost:8081";
    const apiUrl = `${apiUrlBase}/auth?` +
    `${denominacion ? '&denominacion=' + denominacion : ''}` +
    `${minimo ? '&min=' + minimo : ''}` +
    `${maximo ? '&max=' + maximo : ''}`;
    const response = await axios.get(apiUrl);
    console.log("🚀 ~ file: actions.js:16 ~ getProducts ~ response.data:", response.data.content)
    return response.data.content;
  },
};

export default actions;
