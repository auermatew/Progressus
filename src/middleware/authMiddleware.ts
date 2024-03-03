import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET || '', (err, decoded) => {
        if (err) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        req.body.userId = (decoded as any).userId;
        next();
    });
};
