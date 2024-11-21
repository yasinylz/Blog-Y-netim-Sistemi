import { Request, Response } from 'express';
import path from 'path';
import  Post  from '../models/Post';  // Post modelinizi uygun şekilde import edin

export const createPost = async (req: Request, res: Response, next: Function) => {
  const { title, content, author } = req.body;
  const file = req.file;

  try {
    let imagePath: string | undefined = undefined;
    let videoPath: string | undefined = undefined;

    // Dosya türüne göre doğru dosya yolunu oluştur
    if (file) {
      const uploadDir = path.join(__dirname, '..', 'uploads');  // 'uploads' dizininin tam yolu
      const filePath = path.join(uploadDir, file.mimetype.startsWith('image/') ? 'images' : 'videos', file.filename);

      // Eğer resimse
      if (file.mimetype.startsWith('image/')) {
        imagePath = filePath;
      }
      // Eğer video ise
      else if (file.mimetype.startsWith('video/')) {
        videoPath = filePath;
      }
    }

    // Yeni post oluştur
    const newPost = new Post({
      title,
      content,
      author,
      image: imagePath,
      video: videoPath
    });

    // Postu kaydet
    await newPost.save();
    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res.status(400).json({ error });
  }
};
export const getPosts = async (req: Request, res: Response, next: Function) => { 
    try {
      const posts = await Post.find();
      res.status(200).json({ posts: posts });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
  