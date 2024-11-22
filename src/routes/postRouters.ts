import express from 'express';
import { createPost,getPosts,getPostById,updatePost,deletePosts} from '../controllers/postController';
import upload from '../middlewares/fileUpload';
const  router=express.Router();

// Yeni endpointler
router.post('/posts', upload.single('file'), createPost);
router.get('/posts', getPosts);
router.get('/posts/:id', getPostById); // ID'ye göre getir
router.put('/posts/:id', upload.single('file'), updatePost); // Güncelle
router.delete('/posts/:id', deletePosts); // Sil


export default router