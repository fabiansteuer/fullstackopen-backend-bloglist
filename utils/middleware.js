const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info(request.method, request.path, request.body);
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "Unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "JsonWebTokenError") {
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

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
