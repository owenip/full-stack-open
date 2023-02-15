import logo from './logo.svg';
import './App.css';

import { useEffect, useState } from 'react';

import RestCountriesService from './services/RestCountriesService'
import CountryList from './components/CountryList';


function App() {
    const [countries, setCountries] = useState([]);
    const [searchText, setSeatchText] = useState('');

    useEffect(() => {
        if (searchText) {
            RestCountriesService
                .searchByName(searchText)
                .then(searchCountries => setCountries(searchCountries))
                .catch(error => setCountries([]));
        } else {
            setCountries([]);
        }
    }, [searchText]);

    const handleSetCountryToShow = (country) => {
        setCountries([country]);
    }

    const handleSearchTextChange = (event) => {
        setSeatchText(event.target.value);
    }

    return (
        <div>
            <div className='wrapper'>
                <p>Find Countries</p>
                <input value={searchText} onChange={handleSearchTextChange}></input>
            </div>
            <CountryList countries={countries} handleSetCountryToShow={handleSetCountryToShow}/>
        </div>
    );
}

export default App;
