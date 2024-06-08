import { Model } from '../types/Model';

export class CountModel implements Model {
    private value: number;
    constructor() {
        this.value = 0;
    }
    public  increment(){ 
        return ++this.value
    }
    public multiply(){
        return  this.value *= 2
    }
    public decrement(){
        return --this.value;
    }
}
