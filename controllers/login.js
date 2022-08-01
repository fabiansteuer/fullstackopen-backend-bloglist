const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");
const credentials = require("../utils/credentials");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!passwordCorrect) {
    return response.status(401).json({ error: "Invalid username or password" });
  }

  const token = credentials.generateTokenFor(user);

  return response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
