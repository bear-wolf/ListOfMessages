import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { RouterModule } from '@angular/router';

import { DataService } from './services/data.service';
import { LeftPanelComponent } from './components/left-panel/left.panel.component';
import {appRoutes} from "./routes";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftPanelComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
