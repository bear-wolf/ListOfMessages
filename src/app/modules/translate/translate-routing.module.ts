
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TranslateComponent} from './translate.component';
import {TranslateFormComponent} from './translate-form/translate-form.component';


export const TranslateRoutes: Routes = [
    { path: 'translate', component: TranslateComponent, children: [
        { path: 'add', component: TranslateFormComponent},
    ]},
]

@NgModule({
    imports: [
        RouterModule.forChild(TranslateRoutes)
    ],
    exports: [RouterModule]
})
export class TranslateRoutingModule{

}
