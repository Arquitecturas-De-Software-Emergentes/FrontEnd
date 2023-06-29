import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {EmployerComponent} from "./job-offer-list/employer/employer.component";
import { CandidateComponent } from './job-offer-list/candidate/candidate.component';
import {JobOfferViewComponent} from "../components/job-offer/job-offer-view/job-offer-view.component";
import {JobOfferFormComponent} from "../components/job-offer/job-offer-form/job-offer-form.component";
import { PostulationListComponent } from './postulation-list/postulation-list.component';
import { FavoriteJobOfferListComponent } from './favorite-job-offer-list/favorite-job-offer-list.component';
import {JobOfferCandidatesComponent} from "../components/job-offer/job-offer-candidates/job-offer-candidates.component";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  { path: 'candidate', component: CandidateComponent },
  { path: 'employer', component: EmployerComponent},
  { path: 'candidate/my-postulations', component: PostulationListComponent},
  { path: 'candidate/favorites', component: FavoriteJobOfferListComponent},
  { path: 'job-offer-view/:id', component: JobOfferViewComponent},
  { path: 'job-offer-form/:id', component: JobOfferFormComponent},
  { path: 'job-offer-candidates/:id', component: JobOfferCandidatesComponent}

]; // sets up routes constant where you define your routes

@NgModule({
  declarations: [
    PostulationListComponent,
    FavoriteJobOfferListComponent,
    JobOfferCandidatesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
  ],
  exports: [
    RouterModule
  ]
})
export class HomeModule { }
