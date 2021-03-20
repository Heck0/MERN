import User from "../models/user.js";
import shortId from "shortid";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";

const signup = (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({
    email,
  }).exec((err, user) => {
    if (user) {
      return res.status(400).json({ error: "Email is taken" });
    }

    let username = shortId.generate();
    let profile = `${process.env.CLIENT_URL}/profile/${username}`;
    let newUser = new User({ name, email, password, profile, username });

    newUser.save((err, success) => {
      if (err) {
        return res.status(400).json({ error: err });
      }

      res.json({ message: "Signup succes! Please signin" });
    });
  });
};

const signin = (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exists. Please sign up",
      });
    }

    // Authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match.",
      });
    }

    // Generate a token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { expiresIn: "1d" });
    const { _id, username, name, email, role } = user;
    return res.json({ token, user: { _id, username, name, email, role } });
  });
};

const signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout success",
  });
};

const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

export { signup, signin, signout, requireSignin };
