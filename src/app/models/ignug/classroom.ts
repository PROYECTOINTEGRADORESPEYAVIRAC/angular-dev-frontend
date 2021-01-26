import { Catalogue } from 'src/app/models/ignug/catalogue';
import {State} from '../ignug/models.index';


export interface Classroom {
    
    id?: number;
    code?:string;
    name?:string;
    capacity?:number;
    icon?:string;
    type?:Catalogue;
    state?: State;

}