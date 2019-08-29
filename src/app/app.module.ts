import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent, OrderBySelectedPipe } from './app.component';
import { HelloComponent } from './hello.component';
import {ReactiveFormsModule,} from '@angular/forms';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule ],
  declarations: [ AppComponent, HelloComponent, OrderBySelectedPipe ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
