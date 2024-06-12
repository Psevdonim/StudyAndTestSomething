import { UserModel } from '../models/userModel';
import { Controller } from '../../types/Controller';
import { IUser } from '../../types/User';

export class UserController implements Controller {
    model:UserModel;

    constructor(model:UserModel) {
        this.model = model;
    }
    handleGetAll():IUser[]{
        return this.model.getAll();
    }
    handleCreate(user:IUser){
        return this.model.create(user)
    }
    handleDelete(id:number){
        return this.model.delete(id)
    }
    handleSearch(str:string){
        return this.model.searchData(str)
    }
    handleUpdate(user:IUser){
        return this.model.update(user)
    }

}
