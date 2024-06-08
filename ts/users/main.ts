import { UserController } from './controllers/userController';
import { UserModel } from './models/userModel';
import { UserView } from './views/userView';

const controller = new UserController(new UserModel)

const users = new UserView(document.querySelector('.users')!, controller)

users.mount()

console.log(users);

