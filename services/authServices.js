import * as fs from "node:fs/promises";
import path from "node:path";
import gravatar from "gravatar";

import bcrypt from "bcrypt";
import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import { createToken, verifyToken } from "../helpers/jwt.js";
import cloudinary from "../helpers/cloudinary.js";
import sendMail from "../helpers/sendEmail.js";
import { verify } from "node:crypto";

// import cloudinary from "../helpers/cloudinary.js";

const { PUBLIC_URL } = process.env;

const avatarsDir = path.resolve("public", "avatars");

export const findUser = (where) => User.findOne({ where });

export const registerUser = async (payload) => {
  const avatarURL = gravatar.url(payload.email, {
    s: "200",
    d: "mp",
    protocol: "https",
  });
  const hashPassword = await bcrypt.hash(payload.password, 10);
  const user = await User.create({
    ...payload,
    password: hashPassword,
    avatarURL,
  });

  const verificationToken = createToken({ email: payload.email });
  const verifyEmail = {
    to: payload.email,
    subject: "Verify Email",
    html: `<a href="${PUBLIC_URL}/api/auth/verify/${verificationToken}" targer="_blank">Click verify email</a>`,
  };

  await sendMail(verifyEmail);

  await user.update({ verificationToken });
  return user;
};

export const verifyUser = async (verificationToken) => {
  const { data, error } = verifyToken(verificationToken);
  if (error) throw HttpError(401, error.message);

  const user = await findUser({ email: data.email });

  if (user.verify) throw HttpError(401, "Verification has already been passed");
  await user.update({ verify: true, verificationToken: null });
};

export const resendVerifyUser = async ({ email }) => {
  const user = await findUser({ email });
  if (!user) throw HttpError(401, "Email not found");
  if (user.verify) throw HttpError(401, "Verification has already been passed");

  const verificationToken = createToken({ email });
  const verifyEmail = {
    to: email,
    subject: "Verify Email",
    html: `<a href="${PUBLIC_URL}/api/auth/verify/${verificationToken}" targer="_blank">Click verify email</a>`,
  };

  await sendMail(verifyEmail);
};

export const loginUser = async ({ email, password }) => {
  const user = await findUser({ email });
  if (!user) throw HttpError(401, "Email or password is wrong");

  if (!user.verify) throw HttpError(401, "Email not verified");

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
