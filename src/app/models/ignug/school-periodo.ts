import { Catalogue } from 'src/app/models/ignug/catalogue';
import {State} from '../ignug/models.index';

export interface SchoolPeriodo {
    id?: number;
    code?: string;
    name?: string;
    start_date?:Date;
    end_date?:Date;
    ordinary_start_date?:Date;
    ordinary_end_date?:Date;
    extraordinary_start_date?:Date;
    extraordinary_end_date?:Date;
    especial_start_date?:Date;
    especial_end_date?:Date;
    status?: Catalogue;
    state?: State;

}
