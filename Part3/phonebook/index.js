require('dotenv').config();
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const app = express();
const Person = require('./models/person');

const PORT = process.env.PORT;

app.use(express.static('build'));
app.use(express.json());

morgan.token('request-body', (req) => {
    return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :request-body'));

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(persons => {
        const result = persons.map(person => {
            return person.toJSON();
        });

        response.status(200).json(result);
    }).catch(error => {
        next(error);
    });
});

app.get('/api/persons/:id', (request, response, next) => {
    const person_id = request.params.id;
    Person.findById(person_id).then(person => {
        if (person) {
            response.json(person.toJSON());
        } else {
            response.status(404).end();
        }
    }).catch(error => {
        next(error);
    });
});

app.delete('/api/persons/:id', (request, response, next) => {
    const person_id = request.params.id;
    Person.findByIdAndRemove(person_id).then(() => {
        response.status(204).end();
    }).catch(error => {
        next(error);
    });
});

app.post('/api/persons', async (request, response) => {
    const body = request.body;

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
    });
});

app.put('/api/persons/:id', async (request, response, next) => {
    const person_id = request.params.id;
    const body = request.body;

    try {
        await validateRequestData(response, 'number', body);
    } catch (error) {
        next(error);
    }

    Person.findOneAndUpdate({ _id: person_id }, { number: body.number }, { returnOriginal: false }).then(result => {
        response.json(result.toJSON());
    }).catch(error => {
        next(error);
    });
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
    });


});

app.get('/outboundIP', (request, response) => {
    http.get(request.protocol + '://' + request.get('host')
        , (req) => {
            response.json({
                'x-forwarded-for': req.headers['x-forwarded-for']?.split(',').shift() ?? '',
                'socket.remoteAddress': req.socket?.remoteAddress ?? '',
                'req.ip': req.ip,
            });
        });
});

const validateRequestData = async (response, fieldName, requestData) => {
    if (!Object.prototype.hasOwnProperty.call(requestData, fieldName)) {
        throw `${fieldName} is missing`;
    }

    if (fieldName === 'name') {
        const nameAlreadyExist = (await Person.exists({ name: requestData.name })) !== null;
        if (nameAlreadyExist) {
            throw 'name must be unique';
        }
    }

    return true;
};

const errorHandler = (error, request, response) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'Incorrect Id' });
    }

    response.status(400).json(error);
};
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
