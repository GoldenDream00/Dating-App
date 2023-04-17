import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { MemberListComponent } from './modules/members/member-list/member-list.component';
import { MemberDetailComponent } from './modules/members/member-detail/member-detail.component';
import { ListsComponent } from './modules/lists/lists.component';
import { MessagesComponent } from './modules/messages/messages.component';
import { isLoggedIn } from './guards/auth.guard';
import { TestErrorComponent } from './modules/errors/test-error/test-error.component';
import { NotFoundComponent } from './modules/errors/not-found/not-found.component';
import { ServerErrorComponent } from './modules/errors/server-error/server-error.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [isLoggedIn],
    children: [
      {path: 'members', component: MemberListComponent, canActivate: [isLoggedIn]},
      {path: 'members/:username', component: MemberDetailComponent},
      {path: 'lists', component: ListsComponent},
      {path: 'messages', component: MessagesComponent},
    ]
},
  {path: 'errors', component: TestErrorComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
