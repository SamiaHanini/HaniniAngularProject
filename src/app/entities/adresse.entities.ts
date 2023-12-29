import {Location} from './location.entities';

export interface Adresse{
    id: number;
    cp: number;
    localite: string;
    rue: string;
    num: string;
   // llocationsDebut: Location[];
    //llocationsFin: Location[];
}
