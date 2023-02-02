const Phonebook = ({ persons, nameFilter, handleDeletePerson }) => {
    const personToShow = persons.filter((person) => {
        return person.name.includes(nameFilter);
    });

    return (
        <div>
            <h2>Numbers</h2>
            {personToShow.map(person =>
                <Person key={person.id} person={person} handleDeletePerson={handleDeletePerson} />
            )}
        </div>
    );
}

const Person = ({ person, handleDeletePerson }) => {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <p>{person.name} {person.number}</p>
            <button style={{ marginLeft: "5px" }} onClick={() => handleDeletePerson(person.id, person.name)}>Delete</button>
        </div>
    );
}

export default Phonebook;