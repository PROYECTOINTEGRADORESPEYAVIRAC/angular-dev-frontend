import { Authorities } from './authorities';
import { Image } from './../ignug/image';
import { State } from '../ignug/state';

export interface Institucion {
    id?:number;
    name?:string;
    slogan?:string;
    code:string;
    ruc:string;
    state?: State;
    logo?:Image;
    authorities?:Authorities;
}