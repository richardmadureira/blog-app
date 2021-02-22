import express from 'express';
import multer from 'multer';
import PostController from '../controllers/PostController';
import CategoryController from '../controllers/CategoryController';
import uploadConfig from '../config/upload';

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/posts', upload.fields([{ name: 'coverImage', maxCount: 1}, { name: 'images', maxCount:20}]), PostController.create);
routes.put('/posts/:id', PostController.update);
routes.delete('/posts/:id', PostController.delete);
routes.get('/posts/:id', PostController.findById);
routes.post('/posts/pesquisa', PostController.findAll);
routes.get('/posts/post-ids/all', PostController.findAllPostIds);
routes.get('/posts/viewsCount/:id', PostController.atualizarViewsCount);

routes.post('/categories', CategoryController.create);
routes.put('/categories/:id', CategoryController.update);
routes.delete('/categories/:id', CategoryController.delete);
routes.get('/categories/:id', CategoryController.findById);
routes.post('/categories/pesquisa', CategoryController.findAll);
routes.get('/categories/category-ids/all', CategoryController.findAllCategoryIds);

export default routes;