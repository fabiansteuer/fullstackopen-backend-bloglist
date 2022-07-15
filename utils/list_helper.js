const _ = require("lodash");

const totalLikes = (blogs) => {
  return blogs.reduce((previous, current) => previous + current.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const maxLikes = Math.max(...blogs.map((blog) => blog.likes));
  return blogs.find((blog) => blog.likes === maxLikes);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const blogsPerAuthor = _.countBy(blogs, (blog) => blog.author);

  const authorWithMostBlogs = _.maxBy(
    _.keys(blogsPerAuthor),
    (author) => blogsPerAuthor[author]
  );

  return {
    author: authorWithMostBlogs,
    blogs: blogsPerAuthor[authorWithMostBlogs],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const likesPerAuthor = blogs.reduce((previous, current) => {
    if (current.author in previous) {
      previous[[current.author]] += current.likes || current.likes;
      return previous;
    }

    return { ...previous, [current.author]: current.likes };
  }, {});

  const authorWithMostLikes = _.maxBy(
    _.keys(likesPerAuthor),
    (author) => likesPerAuthor[author]
  );

  return {
    author: authorWithMostLikes,
    likes: likesPerAuthor[authorWithMostLikes],
  };
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
