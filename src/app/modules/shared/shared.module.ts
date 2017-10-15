import {NgModule} from '@angular/core';
import {SharedComponent} from './shared.component';
import {TranslatePipe} from './translate/translate.pipe';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        SharedComponent,
        TranslatePipe
    ],
    imports: [
    ],
    exports: [
        CommonModule,

        TranslatePipe,
        SharedComponent
    ],
    bootstrap: [SharedComponent]
})
export class SharedModule { }
