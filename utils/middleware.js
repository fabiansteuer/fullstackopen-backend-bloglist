const jwt = require("jsonwebtoken");
const user = require("../models/user");
const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info(request.method, request.path, request.body, request.headers);
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "Unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "JsonWebTokenError") {
    return response.status(401).send({ error: "Token missing or invalid" });
  } else if (error.name === "SyntaxError") {
    return response.status(401).send({ error: "Token missing or invalid" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).send({ error: "Token expired" });
  } else if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformatted ID" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "MongoServerError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const userExtractor = (request, response, next) => {
  request.user = null;

  const authorization = request.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    const token = authorization.substring(7);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (decodedToken.id) {
      request.user = decodedToken.id;
    }
  }

  next();
};

module.exports = {
  requestLogger,
  userExtractor,
  unknownEndpoint,
  errorHandler,
};
