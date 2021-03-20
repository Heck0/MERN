import { check } from "express-validator";

const userSignupValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const userSigninValidator = [
  check("email").isEmail().withMessage("Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export { userSignupValidator, userSigninValidator };
