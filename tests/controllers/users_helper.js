const User = require("../../models/user");

const initialUsers = [
  {
    _id: "5a422a851b54a676234d17f7",
    name: "Fabian",
    username: "fabian",
    passwordHash:
      "$2b$10$c7FZialRc/4zc9Rbm3A3Z.dMaX6dlxnBXrlWyOdJL4RcNBkRWtVzm",
    __v: 0,
  },
  // {
  //   _id: "5a422aa71b54a676234d17f8",
  //   __v: 0,
  // },
  // {
  //   _id: "5a422b3a1b54a676234d17f9",
  //   __v: 0,
  // },
  // {
  //   _id: "5a422b891b54a676234d17fa",
  //   __v: 0,
  // },
  // {
  //   _id: "5a422ba71b54a676234d17fb",
  //   __v: 0,
  // },
  // {
  //   _id: "5a422bc61b54a676234d17fc",
  // },
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

const newUserWithoutPassword = {
  name: "Newbian",
  username: "newbian",
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  usersInDb,
  initialUsers,
  newUser,
  newUserWithoutUsername,
  newUserWithoutPassword,
};
