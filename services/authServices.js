import User from "../db/models/User.js";

export const registerUser = (payload) => User.create(payload);
