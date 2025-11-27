import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const createToken = (payload) => {
  jwt.sign(payload, JWT_SECRET, { expiredIn: "24h" });
};

export const verifyToken = (payload) => {};
