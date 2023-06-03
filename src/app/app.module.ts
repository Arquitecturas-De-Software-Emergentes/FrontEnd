import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { EmployerComponent } from './home/employer/employer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {CandidateComponent} from "./home/candidate/candidate.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MaterialModule } from './material.module';
import {HttpClientModule} from "@angular/common/http";
import {JobOfferViewComponent} from "./components/job-offer/job-offer-view/job-offer-view.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)},
  {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},
];


@NgModule({
  declarations: [
    AppComponent,
    EmployerComponent,
    CandidateComponent,
    NavBarComponent,
    JobOfferViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    RouterModule,
    NavBarComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
