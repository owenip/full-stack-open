import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import blogsRouter from './controllers/blog.js';

import config from './utils/config.js';
import { info, error } from './utils/logger.js';

const app = express();

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(json());
app.use('/api/blogs', blogsRouter);

app.listen(config.PORT, () => {
    info(`Server running on port ${config.PORT}`);
});