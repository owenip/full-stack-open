import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import config from './utils/config.js';
import { info, error } from './utils/logger.js';

const app = express();

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(json());

app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs);
        });
});

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body);

    blog
        .save()
        .then(result => {
            response.status(201).json(result);
        });
});

app.listen(config.PORT, () => {
    info(`Server running on port ${config.PORT}`);
});