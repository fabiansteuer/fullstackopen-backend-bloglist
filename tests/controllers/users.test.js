const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");

const api = supertest(app);

const User = require("../../models/user");
const helper = require("./users_helper.js");

describe("/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const users = helper.initialUsers.map((user) => new User(user));
    const promises = users.map((user) => user.save());
    await Promise.all(promises);
  });

  test("listing all users succeeds", async () => {
    const users = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(users.length === helper.initialUsers.length);
  });

  test("creating a new user succeeds", async () => {
    const initialUsers = await helper.usersInDb();

    await api
      .post("/api/users")
      .send(helper.newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const finalUsers = await helper.usersInDb();
    expect(finalUsers).toHaveLength(initialUsers.length + 1);

    const usernames = finalUsers.map((user) => user.username);
    expect(usernames).toContain(helper.newUser.username);
  });

  test("creating a new user without username fails", async () => {
    const initialUsers = await helper.usersInDb();

    await api
      .post("/api/users")
      .send(helper.newUserWithoutUsername)
      .expect(400);

    const finalUsers = await helper.usersInDb();
    expect(initialUsers.length === finalUsers.length);
  });

  test("creating a new user with too short a username fails", async () => {
    const initialUsers = await helper.usersInDb();

    await api
      .post("/api/users")
      .send(helper.newUserWithShortUsername)
      .expect(400);

    const finalUsers = await helper.usersInDb();
    expect(initialUsers.length === finalUsers.length);
  });

  test("creating a new user without password fails", async () => {
    const initialUsers = await helper.usersInDb();

    await api
      .post("/api/users")
      .send(helper.newUserWithoutPassword)
      .expect(400);

    const finalUsers = await helper.usersInDb();
    expect(initialUsers.length === finalUsers.length);
  });

  test("creating a new user with too short a password fails", async () => {
    const initialUsers = await helper.usersInDb();

    await api
      .post("/api/users")
      .send(helper.newUserWithShortPassword)
      .expect(400);

    const finalUsers = await helper.usersInDb();
    expect(initialUsers.length === finalUsers.length);
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
