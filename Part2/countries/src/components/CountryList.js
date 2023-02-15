import { useEffect, useState } from "react";
import _ from 'lodash';
import WeatherService from "../services/WeatherService";

const CountryList = ({ countries, handleSetCountryToShow }) => {
    if (countries.length === 0) {
        return (<p>Not Found</p>);
    } else if (countries.length === 1) {
        return <CountryDetail country={countries[0]} />
    } else if (countries.length > 10) {
        return (
            <div>
                <p>Too many matche, specift another filter</p>
            </div>
        );
    }

    return (
        <div>
            <ul>
                {countries.map(country => {
                    return (
                        <li key={country.area}>
                            {country.name.common}<button onClick={() => handleSetCountryToShow(country)}>show</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

const CountryDetail = ({ country }) => {
    const countryLanguages = [];

    for (let lang in country.languages) {
        countryLanguages.push(<CountryLanguage key={lang} language={country.languages[lang]} />);
    }

    return (
        <div>
            <h3>{country.name.common}</h3>
            <p>Capital {country.capital[0]}</p>
            <p>Area {country.area}</p>
            <h4>languages:</h4>
            <ul>
                {countryLanguages}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt}></img>
            <CountryCaptialWeather capital={country.capital[0]} />
        </div>
    );
}

const CountryLanguage = ({ language }) => {
    return (
        <li>{language}</li>
    )
}

const CountryCaptialWeather = ({ capital }) => {
    const [weather, setWeather] = useState({});

    useEffect(() => {
        WeatherService.getCurrentWeatherByCityName(capital)
            .then(data => setWeather(data))
            .catch(error => { return { error_msg: 'Fail to fetch weather info.' } });
    }, [capital]);

    return (
        <>
            {
                !_.isEmpty(weather) ? (
                    <div>
                        <h4>Weather in {capital}</h4>
                        <p>temperature {weather.main.temp}°C</p>
                        <p>wind {weather.wind.speed} m/s</p>
                    </div>
                ) : null
            }
        </>
    );
}

export default CountryList;