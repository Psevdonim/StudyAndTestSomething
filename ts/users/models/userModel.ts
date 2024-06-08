import { Model } from '../types/Model';
import { IUser } from '../types/User';


export class UserModel implements Model {
private users:IUser[]
    constructor(){
        this.users =[{first_name:'tetera',last_name:'kekewa',id:0}]
    }

    create(user:IUser){
        if(!user.last_name || !user.first_name){
            throw Error('Заполните все поля юзера')
        }
        const id = this.users[this.users.length - 1]?.id + 1 
        user.id = !isNaN(id) ? id : 0
        this.users.push(user)
        return user;
    }

    getAll():IUser[]{
        return this.users
    }

    update(user:IUser){
        if(!user.last_name || !user.first_name){
            throw Error('Заполните все поля юзера')
        }
        const findedUser:IUser | undefined = this.users.find(el=> user.id === el.id)
        
        if(findedUser){
            findedUser.first_name = user.first_name
            findedUser.last_name = user.last_name
        }
        return user;
    }

    delete(id: number) {
        if(!!id || id == 0){
            this.users = this.users.filter((el=> id !== el.id))
            return id;
        }
        return -1;
    }

    searchData(str:string){
        if(str){
            return this.users.filter((el=> el.first_name.includes(str) || el.first_name.includes(str)))
        }
        return this.users
    }
}
