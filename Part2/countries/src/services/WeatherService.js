import axios from "axios";

const api_key = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY;

const getCurrentWeatherByCityName = (cityName) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`)

    return request.then(response => {
        return response.data;
    });
}

const WeatherService = {
    getCurrentWeatherByCityName
}

export default WeatherService;