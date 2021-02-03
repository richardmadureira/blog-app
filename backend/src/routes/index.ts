import express from 'express';
import PostController from '../controllers/PostController';

const routes = express.Router();

routes.post('/posts', PostController.create);
routes.put('/posts/:id', PostController.update);
routes.delete('/posts/:id', PostController.delete);
routes.get('/posts/:id', PostController.findById);
routes.post('/posts/pesquisa', PostController.findAll);

export default routes;