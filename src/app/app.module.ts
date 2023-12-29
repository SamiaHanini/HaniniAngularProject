import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {AppComponent} from "./app.component";
import {TaxisComponent} from "./components/taxis/taxis.component";
import {NewTaxiComponent} from "./components/newtaxi/newtaxi.component";
import {LocationsComponent} from "./components/locations/locations.component";
import {ClientsComponent} from "./components/clients/clients.component";
import {AdressesComponent} from "./components/adresses/adresses.component";
import {HomeComponent} from "./components/home/home.component";
import {MainMenuComponent} from "./components/main-menu/main-menu.component";
import {EditTaxiComponent} from "./components/edittaxi/edittaxi.component";
import { NewClientComponent } from './components/newclient/newclient.component';
import { NewAdresseComponent } from './components/newadresse/newadresse.component';
import {NewLocationComponent} from "./components/newlocation/newlocation.component";
import {EditLocationComponent} from "./components/editlocation/editlocation.component";
import { EditClientComponent } from './components/editclient/editclient.component';
import { EditAdresseComponent } from './components/editadresse/editadresse.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  declarations: [
    AppComponent,
    MainMenuComponent,
    HomeComponent,
    TaxisComponent,
    LocationsComponent,
    ClientsComponent,
    AdressesComponent,
    NewTaxiComponent,
    EditTaxiComponent,
    NewLocationComponent,
    EditLocationComponent,
    NewClientComponent,
    NewAdresseComponent,
    EditClientComponent,
    EditAdresseComponent
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}


