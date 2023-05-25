import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeProfileComponent } from './resume-profile/resume-profile.component';
import {RouterModule, Routes} from "@angular/router";
import {MaterialModule} from "../material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {FlexModule} from "@angular/flex-layout";


const routes: Routes = [
  { path: '', component: ResumeProfileComponent },
]; // sets up routes constant where you define your routes

@NgModule({
  declarations: [
    ResumeProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    FlexModule
  ]
})
export class ProfileModule { }
