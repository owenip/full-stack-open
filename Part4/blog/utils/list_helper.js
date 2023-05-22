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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
};