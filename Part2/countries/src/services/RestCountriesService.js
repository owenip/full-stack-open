import axios from "axios";

const baseUrl = 'https://restcountries.com/v3.1/';

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`);

    return request.then(response => response.data);
}

const searchByName = (name) => {
    const request = axios.get(`${baseUrl}/name/${name}`);

    return request.then(response => response.data);
}

const RestCountriesService = {
    getAll,
    searchByName
}

export default RestCountriesService;