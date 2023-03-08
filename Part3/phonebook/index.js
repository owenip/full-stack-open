require('dotenv').config();
const http = require('http');
const express = require('express');
const { response } = require('express');
const morgan = require('morgan');
const app = express();
const Person = require('./models/person');

const PORT = process.env.PORT;

app.use(express.static('build'));
app.use(express.json());

morgan.token('request-body', (req, res) => {
    return JSON.stringify(req.body);
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :request-body'));

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        const result = persons.map(person => {
            return person.toJSON();
        })

        response.status(200).json(result);
    }).catch(error => {
        console.error(error);
    })
});

app.get('/api/persons/:id', (request, response) => {
    const person_id = request.params.id;
    Person.findById(person_id).then(person => {
        response.json(person.toJSON());
    }).catch(error => {
        response.status(404).end();
    })
});

app.delete('/api/persons/:id', (request, response) => {
    const person_id = request.params.id;
    Person.findByIdAndRemove(person_id).then(result => {
        response.status(204).end();
    }).catch(error => {
        console.error(error);
        response.status(400).end();
    })
});

app.post('/api/persons', async (request, response) => {
    const body = request.body

    const requiredFields = ['name', 'number'];
    for (const field of requiredFields) {
        try {
            await validateRequestData(response, field, body);
        } catch (error) {
            response.status(400).json({ error: error });
            return;
        }
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person.save().then(savedPerson => {
        response.json(savedPerson.toJSON());
    }).catch(error => {
        response.status(400).json({ error: error });
        return;
    })

});

app.get('/info', (request, response) => {
    Person.countDocuments({}).then(count => {
        response.send(
            `<p>Phonebook has info for ${count} ${count > 1 ? 'people' : 'person'}</p>
            <p>${new Date()}</p>`
        );
    }).catch(error => {
        response.status(400).json({ error: error });
        return;
    })


});

const validateRequestData = async (response, fieldName, requestData) => {
    if (!requestData.hasOwnProperty(fieldName)) {
        throw `${fieldName} is missing`;
    }

    if (fieldName === 'name') {
        const nameAlreadyExist = (await Person.exists({ name: requestData.name })) !== null;
        if (nameAlreadyExist) {
            throw `name must be unique`;
        }
    }

    return true;
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
