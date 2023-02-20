const http = require('http');
const express = require('express');
const { response } = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.filter(person => person.id === id);

    if (person.length !== 0) {
        response.json(person[0]);
    }

    response.status(404).end();
});

app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${persons.length} ${persons.length > 1 ? 'people' : 'person'}</p>
        <p>${new Date()}</p>`
    );
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
