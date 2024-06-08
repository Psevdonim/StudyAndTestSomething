import { CountController } from './controllers/countController';
import { CountModel } from './modes/countModel';
import { CountView } from './views/countView';

const controller = new CountController(new CountModel())

const counter = new CountView(document.querySelector('.increment')!, controller)
counter.mount();

console.log(counter)