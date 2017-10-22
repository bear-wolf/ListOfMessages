
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserFormComponent} from './user-form/user-form.component';
import {UserComponent} from './user.component';


export const UserRoutes: Routes = [
    { path: 'users', component: UserComponent, children: [
        { path: 'add', component: UserFormComponent},
        { path: 'edit/:id', component: UserFormComponent},
    ]},
]

@NgModule({
    imports: [
        RouterModule.forChild(UserRoutes)
    ],
    exports: [RouterModule]
})
export class UserRoutingModule {

}
