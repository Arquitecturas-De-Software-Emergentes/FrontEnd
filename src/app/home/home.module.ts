import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {EmployerComponent} from "./job-offer-list/employer/employer.component";
import { CandidateComponent } from './job-offer-list/candidate/candidate.component';
import {JobOfferViewComponent} from "../components/job-offer/job-offer-view/job-offer-view.component";
import {JobOfferFormComponent} from "../components/job-offer/job-offer-form/job-offer-form.component";
import { PostulationListComponent } from './postulation-list/postulation-list.component';

const routes: Routes = [
  { path: 'candidate', component: CandidateComponent },
  { path: 'employer', component: EmployerComponent},
  { path: 'my-postulations', component: PostulationListComponent},
  { path: 'job-offer-view/:id', component: JobOfferViewComponent},
  { path: 'job-offer-form/:id', component: JobOfferFormComponent}

]; // sets up routes constant where you define your routes

@NgModule({
  declarations: [
    PostulationListComponent
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
