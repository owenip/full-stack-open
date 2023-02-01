const PersonForm = ({ newName, handleNameChange, newNumber, handleNumberchange, handleSubmitPerson }) => {
    return (
        <form>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberchange} />
            </div>
            <div>
                <button type="submit" onClick={handleSubmitPerson}>add</button>
            </div>
        </form>
    );
}

export default PersonForm;