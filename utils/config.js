require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

console.log(PORT);

module.exports = { MONGODB_URI, PORT };
