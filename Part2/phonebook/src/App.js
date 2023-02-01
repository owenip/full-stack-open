import { useState } from 'react'
import Phonebook from './Phonebook.js'
import PersonForm from './PersonForm.js';
import Filter from './Filter.js';

const App = () => {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [nameFilter, setNameFilter] = useState('');
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])


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