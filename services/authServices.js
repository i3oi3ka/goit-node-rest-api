import * as fs from "node:fs/promises";
import path from "node:path";

import bcrypt from "bcrypt";
import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/jwt.js";
import cloudinary from "../helpers/cloudinary.js";

// import cloudinary from "../helpers/cloudinary.js";

const avatarsDir = path.resolve("public", "avatars");

export const findUser = (where) => User.findOne({ where });

export const registerUser = async (payload) => {
  const hashPassword = await bcrypt.hash(payload.password, 10);
  return User.create({ ...payload, password: hashPassword });
};

export const loginUser = async ({ email, password }) => {
  const user = await findUser({ email });
  if (!user) throw HttpError(401, "Email or password is wrong");

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, "Email or password is wrong");

  const payload = { id: user.id };
  const token = createToken(payload);

  await user.update({ token });

  return {
    token,
    user: { email: user.email, subscription: user.subscription },
  };
};

export const refreshUser = async (user) => {
  const token = createToken({ id: user.id });

  await user.update({ token });

  return {
    token,
    user: { email: user.email, subscription: user.subscription },
  };
};

export const logoutUser = async (user) => {
  await user.update({ token: null });
  return true;
};

export const addAvatar = async (user, file) => {
  let avatar = null;
  if (file) {
    const newPath = path.join(avatarsDir, file.filename);
    await fs.rename(file.path, newPath);
    avatar = path.join("avatars", file.filename);
  }

  await user.update({ avatarURL: avatar });
};

export const addAvatarCloudinary = async (user, file) => {
  let avatar = null;
  if (file) {
    const { secure_url } = await cloudinary.uploader.upload(file.path, {
      folder: "avatars",
      use_filename: true,
    });
    await fs.unlink(file.path);
    avatar = secure_url;
  }

  await user.update({ avatarURL: avatar });
};
