import {Adresse} from './adresse.entities';
import { Client } from './client.entities';
import { Taxi } from './taxi.entities';

export interface LocationEntity{
    idlocation: number;
    dateloc: string;
    kmtotal: number;
    acompte: number;
    total: number;
    taxifk: Taxi;
    clientfk: Client;
    adressedepart: Adresse;
    adressefin: Adresse;

}
