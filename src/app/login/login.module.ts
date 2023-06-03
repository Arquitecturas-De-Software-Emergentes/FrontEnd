import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CandidateComponent } from './candidate/candidate.component';
import { EmployerComponent } from './employer/employer.component';

const routes: Routes = [
  { path: '', redirectTo: 'candidate', pathMatch: 'full' },
  { path: 'candidate', component: CandidateComponent },
  { path: 'employer', component: EmployerComponent },
]; // sets up routes constant where you define your routes

@NgModule({
  declarations: [
    SignInComponent,
    CandidateComponent,
    EmployerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class LoginModule { }
