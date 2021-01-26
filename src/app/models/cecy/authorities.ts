import { Catalogue } from 'src/app/models/ignug/catalogue';
import {State} from '../ignug/models.index';
import {User} from '../auth/user';

export interface Authorities {
    id?: number;
    user?:User;
    status?:Catalogue;
    state?:State;
    position?: Catalogue;
    start_position?:Date;
    end_position?:Date;
   
}