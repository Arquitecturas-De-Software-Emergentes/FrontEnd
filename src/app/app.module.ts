import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { EmployerComponent } from './home/employer/employer.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {MatButtonModule} from "@angular/material/button";
import {CandidateComponent} from "./home/candidate/candidate.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatProgressBarModule} from "@angular/material/progress-bar"; // CLI imports router

const routes: Routes = [
  {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},

];


@NgModule({
  declarations: [
    AppComponent,
    EmployerComponent,
    CandidateComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatGridListModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressBarModule
  ],
  exports: [
    RouterModule,
    NavBarComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
