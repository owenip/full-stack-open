import { useCallback, useEffect, useState } from 'react';
import Phonebook from './components/Phonebook.js';
import PersonForm from './components/PersonForm.js';
import Filter from './components/Filter.js';
import Notification from './components/Notification.js';
import PersonService from './services/PersonService';

const App = () => {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [nameFilter, setNameFilter] = useState('');
    const [persons, setPersons] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });


    const showNotification = (message, type) => {
        setNotification({ message: message, type: type });
        setTimeout(() => {
            setNotification({ message: '', type: '' })
        }, 3000);
    }

    const showError = useCallback((message) => {
        showNotification(message, 'error');
    }, []);

    const showInfo = (message) => {
        showNotification(message, 'info');
    }

    const fetchDbHook = useCallback(() => {
        PersonService.getAll()
            .then(persons => {
                setPersons(persons);
            })
            .catch(error => {
                showError(`Fail to fetch data from server`);
            });
    }, [showError]);

    useEffect(() => { fetchDbHook() }, [fetchDbHook]);

    const handleSubmitPerson = (event) => {
        event.preventDefault();
        if (checkIfInputEmpty('name', newName) || checkIfInputEmpty('number', newNumber)) {
            return;
        }

        const existingPerson = getPersonByName(newName);
        if (existingPerson === null) {
            PersonService
                .create({
                    name: newName,
                    number: newNumber
                })
                .then(person => {
                    setPersons(persons.concat(person))
                    showInfo(`Added ${person.name}`);
                })
        } else {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const updatingPerson = {
                    ...existingPerson,
                    number: newNumber
                };

                PersonService
                    .update(updatingPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson));
                        showInfo(`Updated ${returnedPerson.name}`);
                    })
                    .catch(error => {
                        if (error.response.status === 404) {
                            showError(`Information of ${updatingPerson.name} has already been removed from server`);
                        } else {
                            showError(`Failed to update ${updatingPerson.name}`);
                        }
                    });
            }
        }

        setNewName('');
        setNewNumber('');
    }

    const getPersonByName = (name) => {
        for (let i = 0; i < persons.length; i++) {
            if (persons[i].name === name) {
                return persons[i];
            }
        }

        return null;
    }

    const checkIfInputEmpty = (fieldName, value) => {
        if (value === '') {
            alert(`${fieldName} cannot be empty.`);
            return true;
        }

        return false;
    }

    const handleDeletePerson = (id, name) => {
        if (window.confirm(`Delete ${name} ?`)) {
            PersonService
                .remove(id)
                .then(fetchDbHook)
                .catch(error => {
                    showError(`Error occured when deleting information of ${name}`);
                });
        }
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
            <Notification notification={notification} />
            <Filter value={nameFilter} handleFilterChange={handleFilterChange} />
            <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberchange={handleNumberchange} handleSubmitPerson={handleSubmitPerson} />
            <Phonebook persons={persons} nameFilter={nameFilter} handleDeletePerson={handleDeletePerson} />
        </div>
    )
}

export default App