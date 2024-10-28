const mongoose = require("mongoose");

const Schema = mongoose.Schema;
export const UserSchema = new Schema({
  username: {
    type: String,
    required: "enter a username",
  },
  password: {
    type: String,
    required: "enter a password",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});