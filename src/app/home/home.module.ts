import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {EmployerComponent} from "./employer/employer.component";
import { CandidateComponent } from './candidate/candidate.component';
import {JobOfferViewComponent} from "../components/job-offer/job-offer-view/job-offer-view.component";

const routes: Routes = [
  { path: 'candidate', component: CandidateComponent },
  { path: 'employer', component: EmployerComponent},
  { path: 'job-offer-view/:id', component: JobOfferViewComponent}
]; // sets up routes constant where you define your routes

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class HomeModule { }
