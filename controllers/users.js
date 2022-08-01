const logger = require("../utils/logger");
const usersRouter = require("express").Router();
const User = require("../models/user");
const hashPassword = require("../utils/password");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
  return response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { name, username, password } = request.body;

  if (typeof password === "undefined") {
    logger.error("Password missing");
    return response.status(400).send({ error: "Password missing" });
  }

  if (password.length < 3) {
    logger.error("Password too short");
    return response.status(400).send({ error: "Password too short" });
  }

  const passwordHash = await hashPassword(password);

  const user = new User({
    name,
    username,
    passwordHash,
  });

  const savedUser = await user.save();
  return response.status(201).json(savedUser);
});

module.exports = usersRouter;
