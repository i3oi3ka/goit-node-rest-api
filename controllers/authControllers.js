import { registerUser, loginUser } from "../services/authServices.js";

export const registerController = async (req, res) => {
  const newUser = await registerUser(req.body);

  res.status(201).json({ email: newUser.email });
};

export const loginController = async (req, res) => {
  const token = await loginUser(req.body);

  res.status(200).json({ token });
};
