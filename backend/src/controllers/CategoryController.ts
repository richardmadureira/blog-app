import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import { Category } from '../entities/Category';
import categoryView from '../views/categories_view';
import { getWhereCategoryArgs } from '../utils';
import { Message } from '../models/Message';
import { Severity } from '../models/Severity';
import { IDParams } from '../models/IdParams';
import { PageQuery } from '../models/PageQuery';
import { NameParams } from '../models/NameParams';

export default {
    async create(req: Request<any, Category, Category, any, any>, res: Response) {
        const { name } = req.body;
        const data: any = { name };
        const schema = Yup.object().shape({
            name: Yup.string().required('Nome é obrigatório'),
        });
        await schema.validate(data, { abortEarly: false });

        const categoryRepository = getRepository(Category);
        const category = categoryRepository.create(data);
        const insertResult: any = await categoryRepository.save(category);
        return res
            .status(201)
            .header('messages', JSON.stringify([new Message(Severity.success, 'Categoria criada', 'A categoria foi criada com sucesso!')]))
            .json(categoryView.render(insertResult));
    },

    async update(req: Request<IDParams, Category, Category, any, any>, res: Response<Category>) {
        const { id } = req.params;
        const post = await getRepository(Category).findOne(id);
        if (post) {
            const { name } = req.body;
            const data: any = { name };

            if (data.name === post.name) delete (data.name);

            const schema = Yup.object().shape({
                name: Yup.string().notRequired(),
            });
            await schema.validate(data, { abortEarly: false });
            const columns: any = getWhereCategoryArgs(data);
            await getRepository(Category).update(id, columns);
            const updatedPost = await getRepository(Category).findOne(id);
            return res
                .status(200)
                .header('messages', JSON.stringify([new Message(Severity.error, 'Categoria atualizada', `A categoria de identificador ${id} informado foi atualizado com sucesso`)]))
                .json(categoryView.render(updatedPost));
        }
        return res
            .header('messages', JSON.stringify([new Message(Severity.warning, 'Categoria não encontrada', `Não foi encontrada nenhuma categoria para o identificador ${id} informado`)]))
            .sendStatus(404);
    },

    async findAll(req: Request<IDParams, Category[], Category, PageQuery, any>, res: Response<Category[]>) {
        const { name } = req.body;
        const { page = 1, size = 10, order = '{"name":"ASC"}' } = req.query;
        const data = { name };
        const schema = Yup.object().shape({ name: Yup.string().notRequired() });
        await schema.validate(data, { abortEarly: false });

        const whereArgs = getWhereCategoryArgs(data);
        const result: [Category[], number] = await getRepository(Category).findAndCount({ order: JSON.parse(order), where: whereArgs, take: size, skip: (page - 1) });

        return res
            .header('x-page', page.toString())
            .header('x-size', size.toString())
            .header('x-total-count', result[1].toString())
            .header('messages', JSON.stringify([new Message(Severity.success, 'Pesquisa concluída', `A pesquisa retornou ${result[1]} registros`)]))
            .json(categoryView.renderMany(result[0]));
    },

    async delete(req: Request<IDParams, void, void, any>, res: Response) {
        const { id } = req.params;
        const post = await getRepository(Category).findOne(id);
        if (post) {
            await getRepository(Category).delete(id);
            return res
                .header('messages', JSON.stringify([new Message(Severity.success, 'Categoria Excluída', `A categoria de identificador ${id} informado foi excluída com sucesso`)]))
                .sendStatus(200);
        }
        return res
            .header('messages', JSON.stringify([new Message(Severity.success, 'Categoria não Encontrado', `A categoria de identificador ${id} informado não foi encontrada`)]))
            .sendStatus(404);
    },

    async findById(req: Request<IDParams, void, Category>, res: Response<Category | void>) {
        const { id } = req.params;
        const post = await getRepository(Category).findOne(id);
        if (post) {
            return res
                .header('messages', JSON.stringify([new Message(Severity.success, 'Categoria encontrada', 'A categoria foi encontrada no banco de dados')]))
                .json(categoryView.render(post));
        }
        return res
            .header('messages', JSON.stringify([new Message(Severity.error, 'Categoria não encontrada', `Não foi encontrada nenhuma categoria para o identificador ${id} informado`)]))
            .sendStatus(404);
    },

    async findByName(req: Request<NameParams, void, Category>, res: Response<Category[] | void>) {
        const { name } = req.params;
        const categories: Category[] = await getRepository(Category).find({ where: { name: name} });
        if (categories) {
            return res
                .header('messages', JSON.stringify([new Message(Severity.success, 'Categoria encontrada', 'A categoria foi encontrada no banco de dados')]))
                .json(categoryView.renderMany(categories));
        }
        return res
            .header('messages', JSON.stringify([new Message(Severity.error, 'Categoria não encontrada', `Não foi encontrada nenhuma categoria para o identificador ${name} informado`)]))
            .sendStatus(404);
    },

    async findAllCategoryIds(req: Request, res: Response) {
        const posts: Array<Category> = await getRepository(Category).find({ select: ["id"] });
        return res
            .header("messages", JSON.stringify([new Message(Severity.success, 'Ids encontrados', `${posts.length} ids encontrados`)]))
            .json(categoryView.renderManyIds(posts));

    }
}