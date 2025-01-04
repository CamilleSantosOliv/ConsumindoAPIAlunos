import axios from 'axios';

const api = axios.create({
    baseURL: "https://localhost:7069",
});

export default api; //exportar para que seja usado em qualquer parte do projeto