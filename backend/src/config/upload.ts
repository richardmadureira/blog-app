import multer from 'multer';
import { Request } from 'express';
import path from 'path';

const maxSize: number = 3 * 1024 * 1024;

export default {
    storage: multer.diskStorage({
        destination: path.join(__dirname, '..', '..', 'uploads'),
        filename: (request: Request, file, cb) => {
            const fileName = `${Date.now()}-${file.originalname}`;
            cb(null, fileName);
        },
    }),
    limits: { fileSize: maxSize }
}