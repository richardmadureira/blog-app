import { json, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import { Post } from '../entities/Post';
import postView from '../views/post_view';
import { getWherePostArgs } from '../utils';
import { Message } from '../models/Message';
import { Severity } from '../models/Severity';
import { IDParams } from '../models/IdParams';
import { PageQuery } from '../models/PageQuery';
import { Category } from '../entities/Category';
import {getConnection} from "typeorm";

export default {
    async create(req: Request<any, Post, Post, any, any>, res: Response) {
        const { title, author, excerpt, content, categories, publishDate } = req.body;
        const requestImages:any = req.files as Express.Multer.File[];
        const coverImage = requestImages.coverImage[0].filename;
        let images: any[] = requestImages.images && requestImages.images.lenght>0 ? requestImages.images.map(image => { return {path: image.filename, hash: 'hash do arquivo'}}): [];
        const data: any = { coverImage, title, author, excerpt, content, images, publishDate, categories };
        const schema = Yup.object().shape({
            title: Yup.string().required('Título é obrigatório'),
            author: Yup.string().required('Author é obrigatório'),
            excerpt: Yup.string().required('Resumo é obrigatório'),
            content: Yup.string().required('Conteúdo é obrigatório'),
            images: Yup.array(Yup.object().shape({ path: Yup.string().required('path é obrigatório') })),
            categories: Yup.array(Yup.object().shape({id: Yup.string(), name: Yup.string()}).required('Categorias é obrigatório')).required('Categorias é obrigatório'),
            publishDate: Yup.date().notRequired()
        });
        await schema.validate(data, { abortEarly: false });

        const categoryRepository = getRepository(Category);
        const categoriesEntities = await categoryRepository.findByIds(JSON.parse(categories.toString()).map(c => c.id));
        data.categories = categoriesEntities;

        const postRepository = getRepository(Post);
        const insertResult: any = await postRepository.save(data);
        return res
            .status(201)
            .header('messages', JSON.stringify([new Message(Severity.success, 'Post criado', 'O post foi criado com sucesso!')]))
            .json(postView.render(insertResult));
    },

    async update(req: Request<IDParams, Post, Post, any, any>, res: Response<Post>) {
        const { id } = req.params;
        const post = await getRepository(Post).findOne(id);
        if (post) {
            const { title, author, excerpt, content, viewsCount, publishDate, categories } = req.body;
            const data: any = { title, author, excerpt, content, viewsCount, publishDate, categories };

            if (data.title === post.title) delete (data.title);
            if (data.author === post.author) delete (data.author);
            if (data.excerpt === post.excerpt) delete (data.excerpt);
            if (data.content === post.content) delete (data.content);
            if (data.publishDate === post.publishDate) delete (data.publishDate);
            if (data.viewsCount === post.viewsCount) delete (data.viewsCount);
            if (data.categories === post.categories) delete (data.categories);

            const schema = Yup.object().shape({
                title: Yup.string().notRequired(),
                author: Yup.string().notRequired(),
                excerpt: Yup.string().notRequired(),
                content: Yup.string().notRequired(),
                publishDate: Yup.date().notRequired(),
                viewsCount: Yup.number().notRequired(),
                categories: Yup.string().notRequired()
            });
            await schema.validate(data, { abortEarly: false });
            const columns: any = getWherePostArgs(data);
            await getRepository(Post).update(id, columns);
            const updatedPost = await getRepository(Post).findOne(id, { relations: ['images'] });
            return res
                .status(200)
                .header('messages', JSON.stringify([new Message(Severity.error, 'Post atualizado', `O post de identificador ${id} informado foi atualizado com sucesso`)]))
                .json(postView.render(updatedPost));
        }
        return res
            .header('messages', JSON.stringify([new Message(Severity.warning, 'Post não encontrado', `Não foi encontrado nenhum post para o identificador ${id} informado`)]))
            .sendStatus(404);
    },

    async findAll(req: Request<IDParams, Post[], Post, PageQuery, any>, res: Response<Post[]>) {
        const { title, author, excerpt, content, viewsCount, publishDate, createdAt, updatedAt, categories } = req.body;
        const { page = 1, size = 10, order = '{"publishDate":"DESC"}' } = req.query;
        const data = { title, author, excerpt, content, viewsCount, createdAt, updatedAt, categories };
        const schema = Yup.object().shape({
            title: Yup.string().notRequired(),
            author: Yup.string().notRequired(),
            excerpt: Yup.string().notRequired(),
            viewsCount: Yup.number().notRequired(),
            content: Yup.string().notRequired(),
            publishDate: Yup.date().notRequired(),
            createAt: Yup.date().notRequired(),
            updatedAt: Yup.date().notRequired(),
            categories: Yup.date().notRequired(),
        });
        await schema.validate(data, { abortEarly: false });

        const whereArgs = getWherePostArgs(data);
        const result: [Post[], number] = await getRepository(Post).findAndCount({ relations: ['images', 'categories'], order: JSON.parse(order), where: whereArgs, take: size, skip: (page - 1) });

        return res
            .header('x-page', page.toString())
            .header('x-size', size.toString())
            .header('x-total-count', result[1].toString())
            .header('messages', JSON.stringify([new Message(Severity.success, 'Pesquisa concluída', `A pesquisa retornou ${result[1]} registros`)]))
            .json(postView.renderMany(result[0]));
    },

    async delete(req: Request<IDParams, void, void, any>, res: Response) {
        const { id } = req.params;
        const post = await getRepository(Post).findOne(id);
        if (post) {
            await getRepository(Post).delete(id);
            return res
                .header('messages', JSON.stringify([new Message(Severity.success, 'Post Excluído', `O post de identificador ${id} informado foi excluído com sucesso`)]))
                .sendStatus(200);
        }
        return res
            .header('messages', JSON.stringify([new Message(Severity.success, 'Post não Encontrado', `O post de identificador ${id} informado não foi encontrado`)]))
            .sendStatus(404);
    },

    async findById(req: Request<IDParams, void, Post>, res: Response<Post | void>) {
        const { id } = req.params;
        const post = await getRepository(Post).findOne(id, { relations: ['images', 'categories'] });
        if (post) {
            return res
                .header('messages', JSON.stringify([new Message(Severity.success, 'Post encontrado', 'O post foi encontrado no banco de dados')]))
                .json(postView.render(post));
        }
        return res
            .header('messages', JSON.stringify([new Message(Severity.error, 'Post não encontrado', `Não foi encontrado nenhum post para o identificador ${id} informado`)]))
            .sendStatus(404);
    },

    async findAllPostIds(req: Request, res: Response) {
        const posts: Array<Post> = await getRepository(Post).find({ select: ["id"] });
        return res
            .header("messages", JSON.stringify([new Message(Severity.success, 'Ids encontrados', `${posts.length} ids encontrados`)]))
            .json(postView.renderManyIds(posts));
    },

    async atualizarViewsCount(req: Request, res:Response){
        const { id } = req.params;
        await getConnection().createQueryBuilder().update(Post)
        .set({viewsCount: () => "views_count + 1"})
        .where("id = :id", { id })
        .execute();
    }
}