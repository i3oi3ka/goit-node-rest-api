import jwt from "jsonwebtoken";

import HttpError from "../helpers/HttpError";

const { JWT_SECRET } = process.env;

const authenticate = async (res, req, next) => {
  const { authorization } = req.headers;

  if (!authorization) throw HttpError(401, "Authorization header missing");

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer")
    throw HttpError(401, "Authorization header must have Bearer type");

  try {
    jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw HttpError(401, error.message);
  }
  return token;
};

export default authenticate;
