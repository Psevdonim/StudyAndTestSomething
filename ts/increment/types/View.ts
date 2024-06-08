import {Controller} from './Controller'

export interface View {
    mount(): void;
    controller: Controller;
}
