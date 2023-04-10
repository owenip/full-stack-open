import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import blogsRouter from './controllers/blog.js';

import config from './utils/config.js';
import * as logger from './utils/logger.js';
import * as middleware from './utils/middleware.js';

const app = express();

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
});