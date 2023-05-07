require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const blogsRouter = require('./controllers/blogs');
const middleware = require('./utils/middleware');
const config = require('./utils/config');
const { info, error } = require('./utils/logger');

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;