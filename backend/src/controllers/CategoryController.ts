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
import logger from '../config/logger';

export default {
    async create(req: Request<any, Category, Category, any, any>, res: Response) {
        logger.info('Solicitação de criação de categoria recebida');
        const { name } = req.body;
        const data: any = { name };
        const schema = Yup.object().shape({
            name: Yup.string().required('Nome é obrigatório'),
        });
        await schema.validate(data, { abortEarly: false });

        const categoryRepository = getRepository(Category);
        const category = categoryRepository.create(data);
        const insertResult: any = await categoryRepository.save(category);
        logger.debug(`Categoria de id {insertResult.id} criada com sucesso`);
        return res
            .status(201)
            .header('messages', JSON.stringify([new Message(Severity.success, 'Categoria criada', 'A categoria foi criada com sucesso!')]))
            .json(categoryView.render(insertResult));
    },

    async update(req: Request<IDParams, Category, Category, any, any>, res: Response<Category>) {
        logger.info("Solicitação de atualização de categoria recebida");
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
            logger.debug('Categoria atualizada com sucesso');
            return res
                .status(200)
                .header('messages', JSON.stringify([new Message(Severity.error, 'Categoria atualizada', `A categoria de identificador ${id} informado foi atualizado com sucesso`)]))
                .json(categoryView.render(updatedPost));
        }
        logger.debug('Categoria não encontrada');
        return res
            .header('messages', JSON.stringify([new Message(Severity.warning, 'Categoria não encontrada', `Não foi encontrada nenhuma categoria para o identificador ${id} informado`)]))
            .sendStatus(404);
    },

    async findAll(req: Request<IDParams, Category[], Category, PageQuery, any>, res: Response<Category[]>) {
        logger.info('Solicitação de pesquisa de categorias recebida');
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
        logger.info('Solicitação de exclusão de categoria recebida');
        const { id } = req.params;
        const post = await getRepository(Category).findOne(id);
        if (post) {
            await getRepository(Category).delete(id);
            logger.debug(`Categoria excluída com sucesso: ${id}`);
            return res
                .header('messages', JSON.stringify([new Message(Severity.success, 'Categoria Excluída', `A categoria de identificador ${id} informado foi excluída com sucesso`)]))
                .sendStatus(200);
        }
        logger.debug(`Código da categoria a ser excluída não encontrado: ${id}`);
        return res
            .header('messages', JSON.stringify([new Message(Severity.success, 'Categoria não Encontrado', `A categoria de identificador ${id} informado não foi encontrada`)]))
            .sendStatus(404);
    },

    async findById(req: Request<IDParams, void, Category>, res: Response<Category | void>) {
        logger.info('Solicitação de pesquisa de cateogoria pelo id recebida');
        const { id } = req.params;
        const post = await getRepository(Category).findOne(id);
        if (post) {
            logger.debug('Pesquisa de categoria encontrada finalizada com sucesso');
            return res
                .header('messages', JSON.stringify([new Message(Severity.success, 'Categoria encontrada', 'A categoria foi encontrada no banco de dados')]))
                .json(categoryView.render(post));
        }
        logger.debug(`Código de categoria não encontrado: ${id}`);
        return res
            .header('messages', JSON.stringify([new Message(Severity.error, 'Categoria não encontrada', `Não foi encontrada nenhuma categoria para o identificador ${id} informado`)]))
            .sendStatus(404);
    },

    async findByName(req: Request<NameParams, void, Category>, res: Response<Category[] | void>) {
        logger.info('Solicitação de pesquisa de categoria pelo nome recebida');
        const { name } = req.params;
        const categories: Category[] = await getRepository(Category).find({ where: { name: name} });
        if (categories) {
            logger.debug('Categoria encontrada para o nome informado');
            return res
                .header('messages', JSON.stringify([new Message(Severity.success, 'Categoria encontrada', 'A categoria foi encontrada no banco de dados')]))
                .json(categoryView.renderMany(categories));
        }
        logger.debug(`Categoria não encontrada para o nome ${name} informado`);
        return res
            .header('messages', JSON.stringify([new Message(Severity.error, 'Categoria não encontrada', `Não foi encontrada nenhuma categoria para o identificador ${name} informado`)]))
            .sendStatus(404);
    },

    async findAllCategoryIds(req: Request, res: Response) {
        logger.info('Solicitação de pesquisa de todas os ids de categorias recebida');
        const categories: Array<Category> = await getRepository(Category).find({ select: ["id"] });
        logger.debug(`Solicitação de pesquisa de todos os ds atendida. Total: ${categories.length} categorias`);
        return res
            .header("messages", JSON.stringify([new Message(Severity.success, 'Ids encontrados', `${categories.length} ids encontrados`)]))
            .json(categoryView.renderManyIds(categories));
    }
}