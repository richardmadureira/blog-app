import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import './database/connection';
import routes from './routes';
import errorHandler from './errors/handler';
import helmet from 'helmet';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(routes);
app.use(errorHandler);
app.disable('x-powered-by');

app.listen(3333, () => console.log('servidor iniciado na porta 3333'));