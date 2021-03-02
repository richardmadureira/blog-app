import logger from '../config/logger';
import { Request, Response} from 'express';

const logErrors = (err:any, req: Request<any>, res: Response<any>, next:any) => {
  logger.error(err.stack);
  next(err);
};

export default logErrors;