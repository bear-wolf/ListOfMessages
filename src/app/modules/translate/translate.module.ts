
import {NgModule} from '@angular/core';
import {TranslateComponent} from './translate.component';
import {TranslateFormComponent} from './translate-form/translate-form.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateRoutingModule} from './translate-routing.module';
import {MessageComponent} from "../shared/message/message.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    declarations: [
        TranslateComponent,
        TranslateFormComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateRoutingModule,
    ],
    exports: [
        TranslateComponent,
        TranslateFormComponent,
    ],
    // providers: [HTTP_PROVIDERS],
    bootstrap: [TranslateComponent]
})
export class TranslateModule { }
