import express from 'express';

const routes = (controller) => {
    const router = express.Router();

    router.post('', controller.postUser);
    router.get('/:id', controller.getUserById);
    router.put('/:id', controller.updateFullname);
    router.delete('/:id', controller.deleteUser);

    return router;
}

export default routes;