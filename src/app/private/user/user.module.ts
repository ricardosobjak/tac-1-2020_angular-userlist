import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'new', component: UserFormComponent },
  { path: ':id', component: UserFormComponent },
];

@NgModule({
  declarations: [UserListComponent, UserFormComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UserModule {}
