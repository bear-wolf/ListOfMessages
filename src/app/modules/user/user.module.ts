
import {NgModule} from '@angular/core';
import {UserComponent} from './user.component';
import {UserFormComponent} from './user-form/user-form.component';
import {UserRoutingModule} from './user-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [
        UserFormComponent,
        UserComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        UserRoutingModule,
    ],
    exports: [
        UserFormComponent,
        UserComponent,
        UserRoutingModule
    ],
    bootstrap: [UserComponent]
})
export class UserModule { }
