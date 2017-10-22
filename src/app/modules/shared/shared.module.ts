import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {SharedComponent} from './shared.component';
import {TranslatePipe} from './translate/translate.pipe';
import {CommonModule} from '@angular/common';
import { MessageComponent } from './message/message.component';
import { PreloaderComponent } from './preloader/preloader.component';

@NgModule({
    declarations: [
        SharedComponent,
        TranslatePipe,
        MessageComponent,
        PreloaderComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MessageComponent,
        PreloaderComponent,

        TranslatePipe,
        SharedComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [SharedComponent]
})
export class SharedModule { }
