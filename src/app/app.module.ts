import { ApplicationConfig } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { routes } from './app-routing.module';
import {AppComponent} from "./app.component";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],

  declarations: [
    // Your components here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}


