import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-resume-profile',
  templateUrl: './resume-profile.component.html',
  styleUrls: ['./resume-profile.component.css']
})
export class ResumeProfileComponent implements OnInit{
  companyName = new FormControl('');
  description = new FormControl('');
  websiteUrl = new FormControl('');
  profilePicture = new FormControl('');
  bannerPicture = new FormControl('');

  firstName = new FormControl('');
  lastName = new FormControl('');
  salary = new FormControl('');
  email = new FormControl('');
  phoneNumber = new FormControl('');
  workingPlaces = new FormControl('');
  languages = new FormControl('');
  skills = new FormControl('');
  studyCenter = new FormControl('');
  about = new FormControl('');




  loading = false;
  role: number = 0;

  ngOnInit(): void {
    this.role = Number(sessionStorage.getItem('role'));
    console.log(this.role)
  }
}
