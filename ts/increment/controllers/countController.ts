import { CountModel } from '../modes/countModel';
import { Controller } from '../../types/Controller';

export class CountController implements Controller {
    public model: CountModel;
    constructor(model:CountModel) {
        this.model = model;
    }
    public handleIncrement(){
        return this.model.increment() 
    }
    public handleMultiply(){
        return this.model.multiply() 
    }
    public handleDecrement(){
        return this.model.decrement() 
    }
}