const Blog = require("../../models/blog");
const User = require("../../models/user");

const initialUsers = [
  {
    _id: "4a422a851b54a676234d17f7",
    name: "Fabian",
    username: "fabian",
    passwordHash:
      "$2b$10$2JEFQM/R6Vj5BtO5OB/XOezryUU3BX0pvIST.Ccl7yxXxOkHEd7Am",
    blogs: [],
    __v: 0,
  },
  {
    _id: "4a422a851b54a676234d17f8",
    name: "Naibaf",
    username: "naibaf",
    passwordHash:
      "$2b$10$2JEFQM/R6Vj5BtO5OB/XOezryUU3BX0pvIST.Ccl7yxXxOkHEd7Am",
    blogs: [],
    __v: 0,
  },
];

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    user: "4a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    user: "4a422a851b54a676234d17f7",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    user: "4a422a851b54a676234d17f7",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    user: "4a422a851b54a676234d17f8",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    user: "4a422a851b54a676234d17f8",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    user: "4a422a851b54a676234d17f8",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

const newBlog = {
  title: "Fabian's Blog",
  author: "Fabian",
  url: "https://fabiansteuer.com",
  likes: 1,
};

const newBlogWithoutLikes = {
  title: "Fabian's Blog",
  author: "Fabian",
  url: "https://fabiansteuer.com",
};

const newBlogWithoutTitleAndUrl = {
  author: "Fabian",
  likes: 1,
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  blogsInDb,
  initialBlogs,
  newBlog,
  newBlogWithoutLikes,
  newBlogWithoutTitleAndUrl,
};
