import express from 'express';

const routes = (controller, loginLimitter) => {
    const router = express.Router();

    router.post('', loginLimitter, controller.login);
    router.put('', controller.refreshToken);
    router.delete('', controller.logout);

    return router;
}

export default routes;