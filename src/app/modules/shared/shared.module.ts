import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {SharedComponent} from './shared.component';
import {TranslatePipe} from './translate/translate.pipe';
import {CommonModule} from '@angular/common';
import { MessageComponent } from './message/message.component';
import { PreloaderComponent } from './preloader/preloader.component';
import {PaginationControlsCustomComponent} from './pagination-controls-custom/pagination-controls-custom.component';
import { BsDropdownModule, ModalModule, TabsModule, TypeaheadModule } from 'ngx-bootstrap';

@NgModule({
    declarations: [
        SharedComponent,
        TranslatePipe,
        MessageComponent,
        PreloaderComponent,
        PaginationControlsCustomComponent
    ],
    imports: [
        CommonModule,
        ModalModule,
        BsDropdownModule,
        TabsModule
    ],
    exports: [
        MessageComponent,
        PreloaderComponent,
        PaginationControlsCustomComponent,

        TranslatePipe,
        SharedComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [SharedComponent]
})
export class SharedModule { }
