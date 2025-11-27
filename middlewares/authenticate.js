import HttpError from "../helpers/HttpError.js";
import { verifyToken } from "../helpers/jwt.js";
import { findUser } from "../services/authServices.js";

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw HttpError(401, "Authorization header missing");

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer")
    throw HttpError(401, "Authorization header must have Bearer type");

  const { data, error } = verifyToken(token);
  console.log(token, data);

  if (error) throw HttpError(401, error.message);

  const user = findUser({ id: data.id });

  if (!user) throw HttpError(401, "User not found");

  next();
};

export default authenticate;
