import { Routes } from '@angular/router';
import {MessageComponent} from './pages/message/message.component';
import {ParticipantComponent} from './pages/participant/participant.component';
import {AttachmentComponent} from './pages/attachment/attachment.component';
import {HomeComponent} from './pages/home/home.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {MessageFormComponent} from './pages/message/message-form/message-form.component';

export const appRoutes: Routes = [
    { path: 'messages', component: MessageComponent, children: [
        { path: 'add', component: MessageFormComponent},
        { path: 'edit', component: MessageFormComponent},
    ]},
    { path: 'participant', component: ParticipantComponent},
    { path: 'attachment', component: AttachmentComponent},
    { path: '', component: HomeComponent},
    { path: '**', component: PageNotFoundComponent }
]