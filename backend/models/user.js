import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      unique: true,
      index: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    profile: {
      type: String,
      required: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: String,
    about: {
      type: String,
    },
    role: {
      type: Number,
      trim: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    // Create a temporary variable called _password
    this._password = password;

    // Generate salt
    this.salt = this.makeSalt();

    // Encrypt Password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainPassword) {
    return this.encryptPassword(plainPassword) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";

    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return error;
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

export default mongoose.model("User", userSchema);
