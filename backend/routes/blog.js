import express from "express";
import time from "../controllers/blog.js";

const router = express.Router();

export default router.get("/", time);
