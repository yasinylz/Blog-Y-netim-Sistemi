import express from 'express';
import { createPost,getPosts,getPostById,updatePost,deletePosts} from '../controllers/postControllers';
import upload from '../middlewares/fileUpload';
const  router=express.Router();

// Yeni endpointler
router.post('/add', upload.single('file'), createPost);
router.get('/', getPosts);
router.get('/:id', getPostById); // ID'ye göre getir
router.put('/update/:id', upload.single('file'), updatePost); // Güncelle
router.delete('/delete/:id', deletePosts); // Sil


export default router