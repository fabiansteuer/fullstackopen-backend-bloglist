const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { name: 1, username: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const user = await User.findById(request.user);

  if (!user) {
    return response.status(401).send({ error: "User missing" });
  }

  let blog = new Blog(request.body);

  blog.user = user._id;
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  return response.status(201).json(savedBlog);
});

blogsRouter.put("/:id", async (request, response) => {
  const blog = request.body;
  const result = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
  });
  return response.json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  const blogId = request.params.id;
  const blog = await Blog.findById(blogId);

  if (blog.user.toString() !== request.user) {
    return response.status(401).json({ error: "Not authorized" });
  }

  await Blog.findByIdAndRemove(blogId);
  return response.status(204).end();
});

module.exports = blogsRouter;
