import { View } from '../../types/View';
import { CountController } from '../controllers/countController'

export class CountView  implements View {
    controller:CountController;

    private root:HTMLElement;
    private textRoot:HTMLElement;
    private buttonWrapper:HTMLElement
    private incrementButton:HTMLElement;
    private decrementButton:HTMLElement;
    private multiplyButton:HTMLElement;

    constructor(root:HTMLElement, controller: CountController){
        this.root = root;
        this.controller = controller;

        this.textRoot = document.createElement('p');

        this.buttonWrapper = document.createElement('div');
        this.buttonWrapper.classList.add('button-wrapper');

        this.incrementButton =  document.createElement('button');
        this.incrementButton.innerHTML = 'Increment';

        this.decrementButton = document.createElement('button');
        this.decrementButton.innerHTML = 'Decrement';

        this.multiplyButton = document.createElement('button');
        this.multiplyButton.innerHTML = 'Multiply';
    }
    
    private onIncrementClick = ():void => {
        console.log('view increment');
        this.updateText(this.controller.handleIncrement())
    }
    
    private onMultiplyClick = ():void => {
        this.updateText(this.controller.handleMultiply())
    }
    
    private onDecrementClick = ():void => {
        this.updateText(this.controller.handleDecrement())
    }

    private updateText = (count:number):void => {
        this.textRoot.innerHTML = `Value: ${count}`
    }
    mount():void{ 
        this.updateText(0)
        this.root.appendChild(this.textRoot);
        this.root.appendChild(this.buttonWrapper);
        
        this.incrementButton.addEventListener('click', this.onIncrementClick)
        this.decrementButton.addEventListener('click', this.onDecrementClick)
        this.multiplyButton.addEventListener('click', this.onMultiplyClick)

        this.buttonWrapper.appendChild(this.incrementButton);
        this.buttonWrapper.appendChild(this.decrementButton);
        this.buttonWrapper.appendChild(this.multiplyButton);
    }

}