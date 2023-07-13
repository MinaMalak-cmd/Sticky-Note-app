import {Router} from 'express';
import * as postController from './controllers/post.js';

const router = Router();

router.get('/', postController.getAllPosts);
router.get('/details', postController.getAllPostsWithOwner);
router.post('/', postController.addPost);

export default router;
