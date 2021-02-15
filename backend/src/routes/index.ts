import express from 'express';
import multer from 'multer';
import PostController from '../controllers/PostController';
import uploadConfig from '../config/upload';

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/posts', upload.array('images'), PostController.create);
routes.put('/posts/:id', PostController.update);
routes.delete('/posts/:id', PostController.delete);
routes.get('/posts/:id', PostController.findById);
routes.post('/posts/pesquisa', PostController.findAll);
routes.get('/posts/post-ids/all', PostController.findAllPostIds);

export default routes;