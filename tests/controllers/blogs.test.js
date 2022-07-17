const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../../models/blog");
const helper = require("./blogs_helper");
const app = require("../../app");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogs = helper.initialBlogs.map((blog) => new Blog(blog));
  const promises = blogs.map((blog) => blog.save());
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

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("all blogs have an id", async () => {
  const response = await api.get("/api/blogs");
  const blogIds = response.body.map((blog) => blog.id);

  blogIds.map((id) => expect(id).toBeDefined());
});

test("creating a blog works", async () => {
  const postResponse = await api.post("/api/blogs").send(helper.newBlog);
  const createdBlog = postResponse.body;

  const getResponse = await api.get("/api/blogs");
  const blogs = getResponse.body;

  expect(blogs.length).toEqual(helper.initialBlogs.length + 1);
  expect(blogs).toContainEqual({ ...helper.newBlog, id: createdBlog.id });
});

test("creating a blog without likes sets them to zero", async () => {
  const postResponse = await api
    .post("/api/blogs")
    .send(helper.newBlogWithoutLikes);
  const createdBlog = postResponse.body;

  const expectedBlog = {
    ...helper.newBlogWithoutLikes,
    id: createdBlog.id,
    likes: 0,
  };

  const getResponse = await api.get("/api/blogs");
  const blogs = getResponse.body;

  expect(createdBlog).toEqual(expectedBlog);
  expect(blogs).toContainEqual(expectedBlog);
});

test("creating a blog without title and url returns a 400 error", async () => {
  await api
    .post("/api/blogs")
    .send(helper.newBlogWithoutTitleAndUrl)
    .expect(400);
});

// test("deleting a blog works", async () => {
//   const blogs = helper.blogsInDb();
//   const blogToBeDeleted = blogs.shift();

//   const response = await api.delete(`/api/blogs/${blogToBeDeleted.id}`);

//   const remainingBlogs = helper.blogsInDb();

//   console.log(response.body);
//   console.log(remainingBlogs);

//   response.expect(204);
// });

afterAll(() => {
  mongoose.connection.close();
});
