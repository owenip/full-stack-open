const Phonebook = ({ persons, nameFilter }) => {
    const personToShow = persons.filter((person) => {
        return person.name.includes(nameFilter);
    });

    return (
        <div>
            <h2>Numbers</h2>
            {personToShow.map(person => 
                <Person key={person.id} person={person} nameFilter={nameFilter} />
            )}
        </div>
    );
}

const Person = ({ person }) => {
    return (
        <p key={person.id}>{person.name} {person.number}</p>
    );
}

export default Phonebook;