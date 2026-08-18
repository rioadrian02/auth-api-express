import routes from "./routes";
import UsersController from "./controller";

const users = (container) => {
    const usersController = new UsersController(container);

    return routes(usersController);
}

export default users;