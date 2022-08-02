const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");
const User = require("../../models/User");
const Blog = require("../../models/blog");
const blogsHelper = require("./blogs_helper");
const usersHelper = require("./users_helper");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  const users = usersHelper.initialUsers.map((user) => new User(user));
  let promises = users.map((user) => user.save());
  await Promise.all(promises);

  const blogs = blogsHelper.initialBlogs.map((blog) => new Blog(blog));
  promises = blogs.map((blog) => blog.save());
  await Promise.all(promises);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(blogsHelper.initialBlogs.length);
});

test("all blogs have an id", async () => {
  const response = await api.get("/api/blogs");
  const blogIds = response.body.map((blog) => blog.id);

  blogIds.map((id) => expect(id).toBeDefined());
});

test("creating a blog works", async () => {
  const users = await usersHelper.usersInDb();
  const user = users[0];
  const token = await usersHelper.getTokenFor(user);

  const postResponse = await api
    .post("/api/blogs")
    .send(blogsHelper.newBlog)
    .set("authorization", `bearer ${token}`);
  const createdBlog = postResponse.body;

  const getResponse = await api.get("/api/blogs");
  const blogs = getResponse.body;

  const expectedBlog = {
    ...blogsHelper.newBlog,
    id: createdBlog.id,
    user: { id: user.id, username: user.username, name: user.name },
  };

  expect(blogs.length).toEqual(blogsHelper.initialBlogs.length + 1);
  expect(blogs).toContainEqual(expectedBlog);
});

test("creating a blog without likes sets them to zero", async () => {
  const users = await usersHelper.usersInDb();
  const user = users[0];
  const token = await usersHelper.getTokenFor(user);

  const postResponse = await api
    .post("/api/blogs")
    .send(blogsHelper.newBlogWithoutLikes)
    .set("authorization", `bearer ${token}`);
  const createdBlog = postResponse.body;

  let expectedBlog = {
    ...blogsHelper.newBlogWithoutLikes,
    id: createdBlog.id,
    likes: 0,
    user: user.id,
  };
  expect(createdBlog).toEqual(expectedBlog);

  const getResponse = await api.get("/api/blogs");
  const blogs = getResponse.body;

  expectedBlog.user = { id: user.id, username: user.username, name: user.name };
  expect(blogs).toContainEqual(expectedBlog);
});

test("creating a blog without title and url returns a 400 error", async () => {
  const users = await usersHelper.usersInDb();
  const user = users[0];
  const token = await usersHelper.getTokenFor(user);

  await api
    .post("/api/blogs")
    .send(blogsHelper.newBlogWithoutTitleAndUrl)
    .set("authorization", `bearer ${token}`)
    .expect(400);
});

test("creating a blog without token returns a 401 error", async () => {
  await api.post("/api/blogs").send(blogsHelper.newBlog).expect(401);
});

test("deleting a blog works", async () => {
  const blogs = await blogsHelper.blogsInDb();
  const blogToBeDeleted = blogs.shift();

  const user = await User.findById(blogToBeDeleted.user);
  const token = await usersHelper.getTokenFor(user);

  await api
    .delete(`/api/blogs/${blogToBeDeleted.id}`)
    .set("authorization", `bearer ${token}`)
    .expect(204);

  const remainingBlogs = await blogsHelper.blogsInDb();
  expect(remainingBlogs).not.toContainEqual(blogToBeDeleted);
});

test("updating a blog works", async () => {
  const blogs = await blogsHelper.blogsInDb();
  const blogToBeUpdated = blogs[0];

  const updatedBlog = { ...blogToBeUpdated, likes: blogToBeUpdated.likes + 1 };

  await api
    .put(`/api/blogs/${blogToBeUpdated.id}`)
    .send(updatedBlog)
    .expect(200);

  const updatedBlogs = await blogsHelper.blogsInDb();
  expect(updatedBlogs).toContainEqual(updatedBlog);
});

afterAll(() => {
  mongoose.connection.close();
});
