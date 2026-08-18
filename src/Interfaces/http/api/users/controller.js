import AddUserUseCase from "../../../../Applications/use_case/AddUserUseCase.js";
import DeleteUserUseCase from "../../../../Applications/use_case/DeleteUserUseCase.js";
import DetailUserUseCase from "../../../../Applications/use_case/DetailUserUseCase.js";
import UpdateFullnameUseCase from "../../../../Applications/use_case/UpdateFullnameUseCase.js";
import logger from "../../../../Infrastructures/logger/index.js";

class UsersController {
    constructor(container) {
        this._container = container;

        this.postUser = this.postUser.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.updateFullname = this.updateFullname.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

    }

    async postUser(req, res,next) {
        try {
            const addUser = this._container.getInstance(AddUserUseCase.name);
            const registeredUser = await addUser.execute(req.body);

            logger.info('User berhasil registrasi', { userId: registeredUser.id });

            return res.status(201).json({
                status: 'success',
                data: {
                    registeredUser
                }
            });
        } catch (error) {
            return next(error);
        }
    }

    async getUserById(req, res, next) {
        try {
            const detailUserUseCase = this._container.getInstance(DetailUserUseCase.name);

            const user = await detailUserUseCase.execute(req.params);

            return res.status(200).json({
                status: 'success',
                data: {
                    user
                }
            });
        } catch (error) {
            return next(error);
        }
    }

    async updateFullname(req, res, next) {
        try {
            const updateFullnameUseCase = this._container.getInstance(UpdateFullnameUseCase.name);

            const user = await updateFullnameUseCase.execute(req.body, req.params);

            logger.info('User berhasil udpate username', { userId: user.id });

            return res.status(200).json({
                status: 'success',
                data: {
                    user
                }
            });
        } catch(error) {
            return next(error);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const deleteUserUseCase = this._container.getInstance(DeleteUserUseCase.name);

            await deleteUserUseCase.execute({ userId: req.params.id});

            logger.info('User berhasil dihapus', { userId: req.params.id });
            return res.status(200).json({
                status: 'success',
                message: 'User berhasil dihapus'
            });
        } catch(error) {
            return next(error);
        }
    }
}

export default UsersController;