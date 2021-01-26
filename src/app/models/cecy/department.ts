import { State } from '../ignug/state';
import { Instructores } from './Instructores';
import { Schedule } from './schedule';

export class DepartmentData {
    id?: number;
    name:string;
    address:string;
    charge: Instructores;
    state: State;
    schedule:Schedule;
    canton:Location;
}