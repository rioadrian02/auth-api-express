import routes from "./routes.js";
import AuthenticationsController from "./controller.js";

const authentications = (container, loginLimitter) => {
    const authenticationsController = new AuthenticationsController(container);

    return routes(authenticationsController, loginLimitter);
}

export default authentications;