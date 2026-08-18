import LoginUserUseCase from "../../../../Applications/use_case/LoginUserUseCase.js";
import LogoutUserUseCase from "../../../../Applications/use_case/LogoutUserUseCase.js";
import RefreshAuthenticationUseCase from "../../../../Applications/use_case/RefreshAuthenticationUseCase.js";
import logger from "../../logger/index.js";

class AuthenticationsController {
    constructor(container) {
        this._container = container;
    }

    async login(req, res, next) {
        try {
            const loginUserUseCase = this._container.getInstance(LoginUserUseCase.name);

            const { accessToken, refreshToken } = await loginUserUseCase.execute(req.body);

            logger.info('User berhasil login', { username: req.body.username });

            return res.status(201).json({
                status: 'success',
                data: {
                    accessToken,
                    refreshToken
                }
            });
        } catch(error) {
            return next(error);
        }
    }

    async refreshToken(req, res, next) {
        try {
            const refreshAuthenticationUseCase = this._container.getInstance(RefreshAuthenticationUseCase.name);

            const { accessToken } = await refreshAuthenticationUseCase.execute(req.body);

            return res.status(200).json({
                status: 'success',
                data: { accessToken },
            });

        } catch (error) {
            return next(error);
        }
    }

    async logout(req, res, next) {
        try {
            const logoutUserUseCase = this._container.getInstance(LogoutUserUseCase.name);

            await logoutUserUseCase.execute(req.body);

            logger.info('User berhasil logout');

            return res.status(200).json({
                status: 'success',
                message: 'Logout berhasil',
            });

        } catch (error) {
            return next(error);
        }
    }
}

export default AuthenticationsController;