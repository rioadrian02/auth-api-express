import {Router} from 'express';

const routes = (controller, loginLimitter) => {
    const router = Router();

    router.post('', loginLimitter, controller.login);
    router.put('', controller.refreshToken);
    router.delete('', controller.logout);

    return router;
}

export default routes;