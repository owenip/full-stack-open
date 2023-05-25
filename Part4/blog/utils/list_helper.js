const _ = require('lodash');

const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
    return blogs.reduce((accum, blog) => {
        if (!Object.prototype.hasOwnProperty.call(accum, 'likes') || blog.likes > accum.likes) {
            return blog;
        } else {
            return accum;
        }
    }, {});
};

const mostBlogs = (blogs) => {
    return _.reduce(_.countBy(blogs, 'author'), (result, numOfBlogs, author) => {
        return !numOfBlogs.numOfBlogs || result.numOfBlogs < numOfBlogs ? { author, numOfBlogs } : result;
    }, {}).author;
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
};