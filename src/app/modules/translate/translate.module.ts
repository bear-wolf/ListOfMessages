
import {NgModule} from '@angular/core';
import {TranslateComponent} from './translate.component';
import {TranslateFormComponent} from './translate-form/translate-form.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateRoutingModule} from './translate-routing.module';

@NgModule({
    declarations: [
        TranslateComponent,
        TranslateFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateRoutingModule
    ],
    exports: [
        TranslateComponent,
        TranslateFormComponent,
    ],
    bootstrap: [TranslateComponent]
})
export class TranslateModule { }
