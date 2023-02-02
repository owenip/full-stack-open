import { useEffect, useState } from 'react'
import axios from 'axios';
import Phonebook from './Phonebook.js'
import PersonForm from './PersonForm.js';
import Filter from './Filter.js';

const App = () => {
    const dbUrl = 'http://localhost:3001/db';
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [nameFilter, setNameFilter] = useState('');
    const [persons, setPersons] = useState([]);

    const fetchDbHook = () => {
        axios
            .get(dbUrl)
            .then(response => {
                setPersons(response.data.persons)
            })
    }

    const handleSubmitPerson = (event) => {
        event.preventDefault();
        if (newName === '' || newNumber === '') {
            return;
        }

        if (checkIfNewNameAlreadyExists()) {
            alert(`${newName} is already added to phonebook`)

            return;
        } else {
            setPersons(persons.concat({
                id: persons.length + 1,
                name: newName,
                number: newNumber,
            }));
        }

        setNewName('');
        setNewNumber('');
    }

    const checkIfNewNameAlreadyExists = () => {
        for (let i = 0; i < persons.length; i++) {
            if (persons[i].name === newName) {
                return true;
            }
        }

        return false;
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handleNumberchange = (event) => {
        setNewNumber(event.target.value);
    }

    const handleFilterChange = (event) => {
        setNameFilter(event.target.value);
    }

    useEffect(fetchDbHook, []);

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={nameFilter} handleFilterChange={handleFilterChange} />
            <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberchange={handleNumberchange} handleSubmitPerson={handleSubmitPerson} />
            <Phonebook persons={persons} nameFilter={nameFilter} />
        </div>
    )
}

export default App