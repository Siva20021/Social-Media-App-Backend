import express from "express";
import { createPost,getPostsById,deletePost,likePost,createComment } from "../controllers/Post.js";
const router = express.Router();

router.post("/", createPost);
router.get("/:id", getPostsById);
router.delete("/:id", deletePost);
router.post("/like/:id",likePost);
router.post("/comment/:id",createComment);

export default router;