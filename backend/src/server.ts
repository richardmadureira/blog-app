import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import './database/connection';
import routes from './routes';
import errorHandler from './errors/handler';
import helmet from 'helmet';
import path from 'path';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, "..", "uploads")));
app.use(errorHandler);
app.disable('x-powered-by');
app.get('/', async (req, res) => {
    return res.json({message: 'Hello, World'});
});

app.listen(3333, '192.168.100.43', () => console.log('servidor iniciado na porta 3333'));