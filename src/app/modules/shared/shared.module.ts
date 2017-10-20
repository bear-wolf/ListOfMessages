import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {SharedComponent} from './shared.component';
import {TranslatePipe} from './translate/translate.pipe';
import {CommonModule} from '@angular/common';
import { MessageComponent } from './message/message.component';

@NgModule({
    declarations: [
        SharedComponent,
        TranslatePipe,
        MessageComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MessageComponent,

        TranslatePipe,
        SharedComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [SharedComponent]
})
export class SharedModule { }
