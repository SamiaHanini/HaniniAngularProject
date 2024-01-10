import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TaxisComponent} from './components/taxis/taxis.component';
import {LocationsComponent} from './components/locations/locations.component';
import {ClientsComponent} from './components/clients/clients.component';
import {AdressesComponent} from './components/adresses/adresses.component';
import {NewTaxiComponent} from "./components/newtaxi/newtaxi.component";
import {NewClientComponent} from "./components/newclient/newclient.component";
import {NewAdresseComponent} from "./components/newadresse/newadresse.component";
import {NewLocationComponent} from "./components/newlocation/newlocation.component";
import {EditTaxiComponent} from "./components/edittaxi/edittaxi.component";
import {EditClientComponent} from "./components/editclient/editclient.component";
import {EditAdresseComponent} from "./components/editadresse/editadresse.component";
import {EditLocationComponent} from "./components/editlocation/editlocation.component";


import {HomeComponent} from './components/home/home.component';



export const routes: Routes = [
  {path: 'taxis', component: TaxisComponent},
  {path: 'locations', component: LocationsComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'adresses', component: AdressesComponent},
  {path:"newtaxi",component:NewTaxiComponent},
  {path:"newclient",component:NewClientComponent},
  {path:"newadresse",component:NewAdresseComponent},
  {path:"newlocation",component:NewLocationComponent},
  {path:"edittaxi/:id",component:EditTaxiComponent},
  {path:"editclient/:id",component:EditClientComponent},
  {path:"editadresse/:id",component:EditAdresseComponent},
  {path:"editlocation/:id",component:EditLocationComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
