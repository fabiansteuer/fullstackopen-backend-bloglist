const logger = require("../utils/logger");
const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
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

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    name,
    username,
    passwordHash,
  });

  const savedUser = await user.save();
  return response.status(201).json(savedUser);
});

module.exports = usersRouter;
