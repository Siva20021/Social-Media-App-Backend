import express from "express";
import { createPost,getPostsById,deletePost,likePost,createComment,getPost } from "../controllers/Post.js";
const router = express.Router();

router.post("/", createPost);
router.get("/:id", getPostsById);
router.get("/", getPost);
router.delete("/:id", deletePost);
router.put("/like/:id",likePost);
router.post("/comment/:id",createComment);

export default router;