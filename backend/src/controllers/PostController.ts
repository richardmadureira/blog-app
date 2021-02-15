import { Request, Response } from 'express';
import { getRepository, UpdateResult } from 'typeorm';
import * as Yup from 'yup';
import { Post } from '../models/Post';
import postView from '../views/post_view';
import { getWhereArgs } from '../utils';
import { Message } from '../models/Message';
import { Severity } from '../models/Severity';
import { PostParams } from '../models/PostParams';
import { PostQuery } from '../models/PostQuery';

export default {
    async create(req: Request<any, Post, Post, any, any>, res: Response) {
        const { title, author, summary, content } = req.body;
        const requestImages = req.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename }
        });
        const data: any = { title, author, summary, content, images };
        console.log(data)
        const schema = Yup.object().shape({
            title: Yup.string().required('Título é obrigatório'),
            author: Yup.string().required('Author é obrigatório'),
            summary: Yup.string().required('Resumo é obrigatório'),
            content: Yup.string().required('Conteúdo é obrigatório'),
            images: Yup.array(Yup.object().shape({ path: Yup.string().required('path é obrigatório') }))
        });
        await schema.validate(data, { abortEarly: false });

        const postRepository = getRepository(Post);
        const post = postRepository.create(data);
        const insertResult = await postRepository.save(post);
        return res
            .status(201)
            .header('messages', JSON.stringify([new Message(Severity.success, 'Post criado', 'O post foi criado com sucesso!')]))
            .json(insertResult);
    },

    async update(req: Request<PostParams, Post, Post, any, any>, res: Response<Post>) {
        const { id } = req.params;
        const post = await getRepository(Post).findOne(id);
        if (post) {
            const { title, author, summary, content } = req.body;
            const data: any = { title, author, summary, content };

            if (data.title === post.title) delete (data.title);
            if (data.author === post.author) delete (data.author);
            if (data.summary === post.summary) delete (data.summary);
            if (data.content === post.content) delete (data.content);

            const schema = Yup.object().shape({
                title: Yup.string().notRequired(),
                author: Yup.string().notRequired(),
                summary: Yup.string().notRequired(),
                content: Yup.string().notRequired(),
            });
            await schema.validate(data, { abortEarly: false });
            const columns: any = getWhereArgs(data);
            await getRepository(Post).update(id, columns);
            const updatedPost = await getRepository(Post).findOne(id, { relations: ['images'] });
            return res
                .status(200)
                .header('messages', JSON.stringify([new Message(Severity.error, 'Post atualizado', `O post de identificador ${id} informado foi atualizado com sucesso`)]))
                .json(updatedPost);
        }
        return res
            .header('messages', JSON.stringify([new Message(Severity.warning, 'Post não encontrado', `Não foi encontrado nenhum post para o identificador ${id} informado`)]))
            .sendStatus(404);
    },

    async findAll(req: Request<PostParams, Post[], Post, PostQuery, any>, res: Response<Post[]>) {
        const { title, author, summary, content, publishDate, lastUpdate } = req.body;
        const { page = 1, size = 10, order = '{"publishDate":"DESC"}' } = req.query;
        const data = { title, author, summary, content, publishDate, lastUpdate };
        const schema = Yup.object().shape({
            title: Yup.string().notRequired(),
            author: Yup.string().notRequired(),
            summary: Yup.string().notRequired(),
            content: Yup.string().notRequired(),
            publishDate: Yup.date().notRequired(),
            lastUpdate: Yup.date().notRequired()
        });
        await schema.validate(data, { abortEarly: false });

        const whereArgs = getWhereArgs(data);
        const result: [Post[], number] = await getRepository(Post).findAndCount({ relations: ['images'], order: JSON.parse(order), where: whereArgs, take: size, skip: (page - 1) });

        return res
            .header('x-page', page.toString())
            .header('x-size', size.toString())
            .header('x-total-count', result[1].toString())
            .header('messages', JSON.stringify([new Message(Severity.success, 'Pesquisa concluída', `A pesquisa retornou ${result[1]} registros`)]))
            .json(postView.renderMany(result[0]));
    },

    async delete(req: Request<PostParams, void, void, any>, res: Response) {
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

    async findById(req: Request<PostParams, void, Post>, res: Response<Post | void>) {
        const { id } = req.params;
        const post = await getRepository(Post).findOne(id, { relations: ['images'] });
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

    }
}