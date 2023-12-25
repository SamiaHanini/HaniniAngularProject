import {Location} from './location.entities';

export interface Taxi {

  id: number;
  immatriculation: string;
  carburant:string;
  prixkm: number;
  locations: Location[];
}

