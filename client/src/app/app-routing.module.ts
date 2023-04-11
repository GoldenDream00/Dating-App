import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { MemberListComponent } from './modules/members/member-list/member-list.component';
import { MemberDetailComponent } from './modules/members/member-detail/member-detail.component';
import { ListsComponent } from './modules/lists/lists.component';
import { MessagesComponent } from './modules/messages/messages.component';
import { isLoggedIn } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [isLoggedIn],
    children: [
      {path: 'members', component: MemberListComponent, canActivate: [isLoggedIn]},
      {path: 'members/:id', component: MemberDetailComponent},
      {path: 'lists', component: ListsComponent},
      {path: 'messages', component: MessagesComponent},
    ]
},
  {path: '**', component: MessagesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
