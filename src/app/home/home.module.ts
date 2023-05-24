import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {EmployerComponent} from "./employer/employer.component";
import { CandidateComponent } from './candidate/candidate.component';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";

const routes: Routes = [
  { path: 'candidate', component: CandidateComponent },
  { path: 'employer', component: EmployerComponent}
]; // sets up routes constant where you define your routes

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [
    RouterModule
  ]
})
export class HomeModule { }
