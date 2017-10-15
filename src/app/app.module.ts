import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import {FORM_PROVIDERS} from '@angular/common';

import { AppComponent } from './pages/layout/app.component';
import { HeaderComponent } from './components/header/header.component';

import { RouterModule } from '@angular/router';

import { DataService } from './services/data.service';
import { LeftPanelComponent } from './components/left-panel/left.panel.component';
import {appRoutes} from "./routes";
import { MessageComponent } from './pages/message/message.component';
import { AttachmentComponent } from './pages/attachment/attachment.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MessageFormComponent } from './pages/message/message-form/message-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from './modules/user/user-service.service';
import {UserModule} from './modules/user/user.module';
import {TranslatePipe} from './modules/shared/translate/translate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftPanelComponent,
    MessageComponent,
    AttachmentComponent,
    HomeComponent,
    PageNotFoundComponent,
    MessageFormComponent,

  ],
  imports: [
    UserModule,

    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
