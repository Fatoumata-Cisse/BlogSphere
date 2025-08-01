
import express from 'express';
import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  likeArticle,
  viewArticle,
  commentOnArticle
} from '../controllers/articleController.js';

import { protect } from '../middlewares/authMiddleware.js'; 

const router = express.Router();

router.post('/', protect, createArticle);
router.get('/', getAllArticles);
router.get('/:id', viewArticle); 
router.put('/:id', protect, updateArticle);
router.delete('/:id', protect, deleteArticle);

router.post('/:id/like', protect, likeArticle);
router.post('/:id/comment', protect, commentOnArticle);

export default router;
