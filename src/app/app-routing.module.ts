import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { mainModule } from 'process';
import { AuthGuard } from '../app/_helpers/auth.guard'

const routes: Routes = [{ path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
{ path: 'admin-home', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard] },
{ path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
