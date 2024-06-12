import { UserController } from './users/controllers/userController';
import { UserModel } from './users/models/userModel';
import { UserView } from './users/views/userView';
import { CountController } from './increment/controllers/countController';
import { CountModel } from './increment/modes/countModel';
import { CountView } from './increment/views/countView';

const userController = new UserController(new UserModel)

const users = new UserView(document.querySelector('.users')!, userController)

users.mount()

console.log(users);

const countController = new CountController(new CountModel())

const counter = new CountView(document.querySelector('.increment')!, countController)
counter.mount();

console.log(counter)

