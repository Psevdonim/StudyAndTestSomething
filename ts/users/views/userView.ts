import { UserController } from '../controllers/userController';
import { IUser } from '../../types/User';
import { View } from '../../types/View';

export class UserView implements View {
    controller: UserController;
    root: HTMLElement;
    
    private nameUserInput:HTMLInputElement;
    private lastNameUserInput:HTMLInputElement;
    private searchUserInput:HTMLInputElement;
    private createUserButton:HTMLElement;
    private searchUserButton:HTMLElement;
    
    private controlWrapper:HTMLElement;
    private usersWrapper:HTMLElement;
    
    private searchWrapper:HTMLElement;

    
    constructor(root: HTMLElement,controller:UserController) {
        this.root = root;
        this.controller = controller;

        // Create Wrappers
        this.controlWrapper = document.createElement('div');
        this.controlWrapper.classList.add('control-wrapper')
        this.usersWrapper = document.createElement('div');
        this.usersWrapper.classList.add('users-wrapper')
        this.searchWrapper = document.createElement('div');
        this.searchWrapper.classList.add('search-wrapper')

        // Create Buttons
        this.searchUserButton = document.createElement('button');
        this.searchUserButton.innerText = 'Search'
        this.createUserButton = document.createElement('button');
        this.createUserButton.innerText = 'Create'

        // Create Inputs
        this.nameUserInput = document.createElement('input');
        this.nameUserInput.setAttribute('placeholder','First Name')
        this.lastNameUserInput = document.createElement('input');
        this.lastNameUserInput.setAttribute('placeholder','Last Name')
        this.searchUserInput = document.createElement('input');
        this.searchUserInput.setAttribute('placeholder','Search')
        
        this.bindListeners()
    }

    private onCreateUserClick = () => {
        const first_name = this.nameUserInput.value;
        const last_name = this.lastNameUserInput.value;
        const createdUser = this.controller.handleCreate({first_name, last_name, id:0})
        if(createdUser?.id >= 0){
            this.updateOrCreateOneUserInWrapper(createdUser)
        }
        this.nameUserInput.value = ''
        this.lastNameUserInput.value = ''
    }
    
    private onUserDeleteClick = (id:number) => {
        const deleteId = this.controller.handleDelete(id)
        if(deleteId !== -1){
            this.usersWrapper.removeChild(this.usersWrapper.querySelector(`#user-${deleteId}`)!)
        }
    }

    private onSearchUserClick = () => {
        const str = this.searchUserInput.value;
        this.updateAllUsers(this.controller.handleSearch(str))
    }

    private onEditUserClick = (userNameWrapper:HTMLElement, userLastNameWrapper:HTMLElement, editButton:HTMLElement, saveButton:HTMLElement, user:IUser) => {
        userNameWrapper.innerHTML = `<input value="${user.first_name}" placeholder="First Name">`
        userLastNameWrapper.innerHTML = `<input value="${user.last_name}" placeholder="Last Name">`
        editButton.classList.add('hidden')
        saveButton.classList.remove('hidden')
    }

    private onSaveUserClick = (userNameWrapper:HTMLElement, userLastNameWrapper:HTMLElement, editButton:HTMLElement, saveButton:HTMLElement, id:number) => {
        const first_name = userNameWrapper.querySelector('input')?.value ?? ''
        const last_name = userLastNameWrapper.querySelector('input')?.value ?? ''
        saveButton.classList.add('hidden')
        editButton.classList.remove('hidden')
        this.updateOrCreateOneUserInWrapper(this.controller.handleUpdate({id,first_name,last_name}))
    }
    private getAllUsers(){
        this.searchUserInput.value = ''
        this.updateAllUsers(this.controller.handleGetAll())
    }

    updateOrCreateOneUserInWrapper(user:IUser){
        let userWrapper = this.usersWrapper.querySelector(`#user-${user.id}`)

        const first_name = userWrapper?.querySelector('user__first-name')?.innerHTML ?? ''
        const last_name = userWrapper?.querySelector('user__last-name')?.innerHTML ?? ''

        const isInput = first_name.includes('<input') || last_name.includes('<input')
        const isNotUpdated = first_name == `First Name : ${user.first_name}` || last_name == `Last Name : ${user.last_name}`

        if(isInput || isNotUpdated ){
            return;
        }else if(!userWrapper){
            userWrapper = document.createElement('div');
            userWrapper.classList.add('user')
            userWrapper.setAttribute('id',`user-${user.id}`)
            this.usersWrapper.appendChild(userWrapper);
        }

        userWrapper.innerHTML = ''
        const textWrapper = document.createElement('div');
        textWrapper.classList.add('text-wrapper')
        
        const buttonWrapper = document.createElement('div')
        buttonWrapper.classList.add('button-wrapper')

        const userIdWrapper = document.createElement('p')
        userIdWrapper.classList.add('user__id')
        userIdWrapper.innerHTML = `ID: ${user.id}`;

        const userNameWrapper = document.createElement('p')
        userNameWrapper.classList.add('user__first-name')
        userNameWrapper.innerHTML = `First Name : ${user.first_name}`;

        const userLastNameWrapper = document.createElement('p')
        userLastNameWrapper.classList.add('user__last-name')
        userLastNameWrapper.innerHTML = `Last Name : ${user.last_name}`;

        const deleteButton = document.createElement('button');
        const editButton = document.createElement('button');
        const saveButton = document.createElement('button');
        
        deleteButton.innerHTML = 'Delete'
        deleteButton.addEventListener('click', this.onUserDeleteClick.bind(this, user.id))

        saveButton.innerHTML = 'Save'
        saveButton.classList.add('hidden')
        saveButton.addEventListener('click', this.onSaveUserClick.bind(this, userNameWrapper, userLastNameWrapper, editButton, saveButton, user.id))

        editButton.innerHTML = 'Edit'
        editButton.addEventListener('click', this.onEditUserClick.bind(this, userNameWrapper, userLastNameWrapper, editButton, saveButton, user))

        userWrapper.appendChild(textWrapper)
        userWrapper.appendChild(buttonWrapper)

        textWrapper.appendChild(userIdWrapper)
        textWrapper.appendChild(userNameWrapper)
        textWrapper.appendChild(userLastNameWrapper)

        buttonWrapper.appendChild(saveButton)
        buttonWrapper.appendChild(editButton)
        buttonWrapper.appendChild(deleteButton)
    }

    updateAllUsers(users:IUser[]){
        this.usersWrapper.innerHTML = ''

        users.forEach(user => {
            this.updateOrCreateOneUserInWrapper(user)
        })
    }

    bindListeners(){
        this.createUserButton.addEventListener('click',this.onCreateUserClick)
        this.searchUserButton.addEventListener('click',this.onSearchUserClick)
    }

    mount(){
        this.root.appendChild(this.controlWrapper)
        this.root.appendChild(this.usersWrapper)

        this.controlWrapper.appendChild(this.nameUserInput)
        this.controlWrapper.appendChild(this.lastNameUserInput)
        this.controlWrapper.appendChild(this.createUserButton)

        this.controlWrapper.appendChild(this.searchWrapper)
        this.searchWrapper.appendChild(this.searchUserInput)
        this.searchWrapper.appendChild(this.searchUserButton)
        
        this.getAllUsers();
    }


}