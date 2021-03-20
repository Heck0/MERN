import express from "express";
import { signup, signin, signout, requireSignin } from "../controllers/auth.js";
import { runValidation } from "../validators/index.js";
import {
  userSignupValidator,
  userSigninValidator,
} from "../validators/auth.js";

const router = express.Router();

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/signout", signout);

// Test
router.get("/secret", requireSignin, (req, res) => {
  res.json({
    message: "You have access to secret page",
  });
});

export default router;
