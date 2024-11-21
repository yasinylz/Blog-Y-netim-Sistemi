import express from 'express';
import { createPost,getPosts } from '../controllers/createPost';
import upload from '../middlewares/fileUpload';
const  router=express.Router();
router.post('/posts',upload.single('file'),createPost);
router.get('/posts',getPosts);
export default router