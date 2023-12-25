import {Adresse} from './adresse.entities';
import {Client} from './client.entities';
import {Taxi} from './taxi.entities';

export interface Location{
    id: number;
    dateLoc: Date;
    kmtotal: number;
    acompte: number;
    total: number;
    client: Client;
    taxi: Taxi;
    adresseDebut: Adresse;
    adresseFin: Adresse;
}
