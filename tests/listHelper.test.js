const listHelper = require("../utils/list_helper");

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

describe("total likes", () => {
  test("for no blogs, return 0", () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test("for one blog, return likes of that blog", () => {
    expect(listHelper.totalLikes([blogs[0]])).toBe(7);
  });

  test("for several blogs, return total likes of all blogs", () => {
    expect(listHelper.totalLikes(blogs)).toBe(38);
  });
});

describe("favorite blog", () => {
  test("for no blogs, return an empty object", () => {
    expect(listHelper.favoriteBlog([])).toEqual({});
  });

  test("for one blog, return that blog", () => {
    expect(listHelper.favoriteBlog([blogs[0]])).toEqual(blogs[0]);
  });

  test("for several blogs, return the blog with the most likes", () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2]);
  });

  test("for several blogs of which several have the most likes, return the first blog with the most likes", () => {
    expect(listHelper.favoriteBlog(blogs.slice(0, 2))).toEqual(blogs[0]);
  });
});

describe("author with most blogs", () => {
  test("for no blogs, return an empty object", () => {
    expect(listHelper.mostBlogs([])).toEqual({});
  });

  test("for one blog, return the author", () => {
    expect(listHelper.mostBlogs([blogs[0]])).toEqual({
      author: blogs[0].author,
      blogs: 1,
    });
  });

  test("for several blogs, return the author with the most blogs", () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });

  test("for several blogs of which two authors have the most blogs, return the first author", () => {
    expect(listHelper.mostBlogs(blogs.slice(0, 2))).toEqual({
      author: "Michael Chan",
      blogs: 1,
    });
  });
});

describe("author with most likes", () => {
  test("for no blogs, return an empty object", () => {
    expect(listHelper.mostLikes([])).toEqual({});
  });

  test("for one blog, return the author", () => {
    expect(listHelper.mostLikes([blogs[0]])).toEqual({
      author: blogs[0].author,
      likes: blogs[0].likes,
    });
  });

  test("for several blogs, return the author with the most likes", () => {
    expect(listHelper.mostLikes(blogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 19,
    });
  });

  test("for several blogs of which two authors have the most likes, return the first author", () => {
    expect(listHelper.mostLikes(blogs.slice(0, 2))).toEqual({
      author: "Michael Chan",
      likes: 7,
    });
  });
});
