const http = require('http');
const express = require('express');
const { response } = require('express');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('build'));
app.use(express.json());

morgan.token('request-body', (req, res) => {
    return JSON.stringify(req.body);
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :request-body'));

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
    const person = persons.find(person => person.id === id);

    if (person) {
        response.json(person);
    }

    response.status(404).end();
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();
});

app.post('/api/persons', (request, response) => {
    const body = request.body

    const requiredFields = ['name', 'number'];
    for (const field of requiredFields) {
        try {
            validateRequestData(response, field, body);
        } catch (error) {
            response.status(400).json({ error: error });
            return;
        }
    }

    const person = {
        id: generateNewId(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person);

    response.json(person);
});

app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${persons.length} ${persons.length > 1 ? 'people' : 'person'}</p>
        <p>${new Date()}</p>`
    );
});

const generateNewId = () => {
    return Math.floor(Math.random() * 9999);
}

const validateRequestData = (response, fieldName, requestData) => {
    if (!requestData.hasOwnProperty(fieldName)) {
        throw `${fieldName} is missing`;
    }

    if (fieldName === 'name') {
        const nameAlreadyExist = persons.filter(person => person.name === requestData.name).length > 0;
        if (nameAlreadyExist) {
            throw `name must be unique`;
        }
    }

    return true;
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
