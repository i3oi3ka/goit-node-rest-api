import {
  registerUser,
  verifyUser,
  loginUser,
  refreshUser,
  logoutUser,
  addAvatar,
  resendVerifyUser,
} from "../services/authServices.js";

export const registerController = async (req, res) => {
  const newUser = await registerUser(req.body);

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

export const verifyController = async (req, res) => {
  const { verificationToken } = req.params;
  verifyUser(verificationToken);

  res.json({ message: "Succesfuly verificated email" });
};

export const resendVerifyController = async (req, res) => {
  await resendVerifyUser(req.body);

  res.json({ message: "Verify email resend successfuly" });
};

export const loginController = async (req, res) => {
  const result = await loginUser(req.body);

  res.status(200).json(result);
};

export const getCurrentController = async (req, res) => {
  const result = await refreshUser(req.user);
  res.json(result);
};

export const logoutController = async (req, res) => {
  await logoutUser(req.user);
  res.status(204).send();
};

export const addAvatarController = async (req, res) => {
  await addAvatar(req.user, req.file);
  res.status(200).send();
};
