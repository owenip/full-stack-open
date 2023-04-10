import express from 'express';
const blogsRouter = express.Router();

import { Blog } from '../models/blog.js';

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs);
    });
});

blogsRouter.post('/', (request, response, next) => {
    const body = request.body;

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
    });

    blog.save()
        .then(savedBlog => {
            response.json(savedBlog);
        })
        .catch(error => next(error));
});

export default blogsRouter;