import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {FilteringModule} from "filtering"
// import {FilteringModule} from "angular-sunbird-filtering"

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FilteringModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
