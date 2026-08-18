import routes from "./routes";
import AuthenticationsController from "./controller";

const authentications = (container) => {
    const authenticationsController = new AuthenticationsController(container);

    return routes(authenticationsController);
}

export default authentications;