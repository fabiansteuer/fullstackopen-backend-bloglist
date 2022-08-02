const User = require("../../models/user");
const supertest = require("supertest");
const app = require("../../app");

const api = supertest(app);

const initialUsers = [
  // {
  //   _id: "5a422a851b54a676234d17f7",
  //   name: "Fabian",
  //   username: "fabian",
  //   passwordHash:
  //     "$2b$10$c7FZialRc/4zc9Rbm3A3Z.dMaX6dlxnBXrlWyOdJL4RcNBkRWtVzm",
  //   __v: 0,
  // },
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

const newUser = {
  name: "Newbian",
  username: "newbian",
  password: "password",
};

const newUserWithoutUsername = {
  name: "Newbian",
  password: "password",
};

const newUserWithShortUsername = {
  name: "Newbian",
  username: "ne",
  password: "password",
};

const newUserWithoutPassword = {
  name: "Newbian",
  username: "newbian",
};

const newUserWithShortPassword = {
  name: "Newbian",
  username: "newbian",
  password: "pa",
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const getTokenFor = async (user) => {
  const response = await api
    .post("/api/login")
    .send({ username: user.username, password: "password" });

  return response.body.token;
};

module.exports = {
  usersInDb,
  initialUsers,
  newUser,
  newUserWithoutUsername,
  newUserWithShortUsername,
  newUserWithoutPassword,
  newUserWithShortPassword,
  getTokenFor,
};
