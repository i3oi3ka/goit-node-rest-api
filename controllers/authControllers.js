import { registerUser } from "../services/authServices.js";

export const registerController = async (req, res) => {
  const newUser = await registerUser(req.body);

  res.status(201).json({ email: newUser.email });
};
