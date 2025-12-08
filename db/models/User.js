import { DataTypes } from "sequelize";

import sequelize from "../sequelize.js";

import { emailRegExp } from "../constants/authConstants.js";

const User = sequelize.define("user", {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: { args: true, msg: "Email in use" },
    validate: {
      is: emailRegExp,
    },
  },
  subscription: {
    type: DataTypes.ENUM,
    values: ["starter", "pro", "business"],
    defaultValue: "starter",
  },
  avatarURL: DataTypes.STRING,
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  verify: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verificationToken: {
    type: DataTypes.STRING,
  },
});

// User.sync({ alter: true });

export default User;
