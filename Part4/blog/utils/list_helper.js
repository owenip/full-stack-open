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

const mostBlogs = (blog_list) => {
    return _.reduce(_.countBy(blog_list, 'author'), (accum, totol_blogs, author) => {
        return !accum.blogs || accum.blogs < totol_blogs ? { author, blogs: totol_blogs } : accum;
    }, {});
};

const mostLike = (blogs) => {
    const author = _.maxBy(blogs, 'likes').author;
    return {
        author,
        likes: _.sumBy(_.filter(blogs, { author }), 'likes')
    };
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLike,
};