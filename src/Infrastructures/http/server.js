import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import users from '../../Interfaces/http/api/users/index.js';
import authentications from '../../Interfaces/http/api/authentications/index.js';
import ErrorHandler from './middlewares/ErrorHandler.js';
import { globalLimiter, loginLimitter } from './middlewares/RateLimiter.js';
import apiDocsMiddleware from './middlewares/ApiDocs.js';

const createServer = (container) => {
    const app = express();

    // using helmet
    app.use(helmet());

    // using cors
    app.use(cors());    

    // global limiter
    app.use(globalLimiter);

    app.use(express.json());

     // Dokumentasi API — hanya tampil di development
    if (process.env.NODE_ENV !== 'production') {
        app.use('/docs', apiDocsMiddleware);
    }

    // user routes
    app.use('/users', users(container));

    // auth routes
    app.use('/authentications', authentications(container, loginLimitter));

    // error handler
    app.use(ErrorHandler);

    return app;
}

export default createServer;