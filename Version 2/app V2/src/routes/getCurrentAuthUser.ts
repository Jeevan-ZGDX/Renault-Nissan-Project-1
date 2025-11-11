import type express from 'express';
import jwt from 'jsonwebtoken';

const getCurrentAuthUser = (): express.RequestHandler => {
    const handler: express.RequestHandler = async (req, res, next) => {
        const token = req.cookies.storm_app_token;
        if (!token) {
            return res.status(401).send();
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string, role: string, email: string, name: string };
            return res.status(200).json({
                id: decoded.userId,
                userId:decoded.userId,
                role: decoded.role,
                email: decoded.email,
                name: decoded.name
            });
        } catch (error) {
            return res.status(401).redirect('/login.html');
        }
    };
    return handler;
};

export default getCurrentAuthUser;