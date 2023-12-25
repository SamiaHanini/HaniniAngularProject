import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TaxisComponent} from './components/taxis/taxis.component';
import {LocationsComponent} from './components/locations/locations.component';
import {ClientsComponent} from './components/clients/clients.component';
import {AdressesComponent} from './components/adresses/adresses.component';
import {HomeComponent} from './components/home/home.component';

export const routes: Routes = [
  {path: 'taxis', component: TaxisComponent},
  {path: 'locations', component: LocationsComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'adresses', component: AdressesComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
