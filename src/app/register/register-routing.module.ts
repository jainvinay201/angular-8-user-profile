import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [{path: '', component: RegisterComponent},
{path: 'edit-profile', component: EditProfileComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
