import {Location} from './location.entities';

export interface Client{
    id: number;
    mail: string;
    nom: string;
    prenom: string;
    tel: string;
    locations: Location[];
}
