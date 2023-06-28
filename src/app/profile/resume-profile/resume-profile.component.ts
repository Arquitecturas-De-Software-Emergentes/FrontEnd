import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ProfileService} from "../profile.service";
import {UserUpdateRequest} from "../../request/userUpdateRequest";

@Component({
  selector: 'app-resume-profile',
  templateUrl: './resume-profile.component.html',
  styleUrls: ['./resume-profile.component.css']
})
export class ResumeProfileComponent implements OnInit{

  userUpdateRequest: UserUpdateRequest = {
    id: 0,
    firstName: '',
    lastName: '',
    salary: 0,
    email: '',
    phoneNumber: 0,
    workingPlaces: '',
    languages: '',
    studyCenter: '',
    skills: '',
    about: '',
    bannerPicture: '',
    profilePicture: '',
    companyName: '',
    description: '',
    websiteUrl: '',
  }

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
  userId: string = sessionStorage.getItem('userId')+'';

  constructor(public profileService: ProfileService) {
    this.userUpdateRequest.id = Number(this.userId);
  }


  ngOnInit(): void {
    this.role = Number(sessionStorage.getItem('role'));
    this.getUserInfo();
  }

  getUserInfo(){
    this.profileService.getPostulant(this.userId).subscribe(
      res=> {
        this.profilePicture.setValue(res.data.profilePicture);
        this.bannerPicture.setValue(res.data.bannerPicture);
        this.firstName.setValue(res.data.firstName);
        this.lastName.setValue(res.data.lastName);
        this.email.setValue(res.data.email);
        this.workingPlaces.setValue(res.data.workingPlaces);
        this.languages.setValue(res.data.languages);
        this.skills.setValue(res.data.skills);
        this.studyCenter.setValue(res.data.studyCenter);
        this.about.setValue(res.data.about);
      }
    );
  }
  setUserInfo(){
    this.userUpdateRequest.profilePicture = this.profilePicture.value? this.profilePicture.value: '';
    this.userUpdateRequest.bannerPicture = this.bannerPicture.value?this.bannerPicture.value: '';
    this.userUpdateRequest.firstName = this.firstName.value?this.firstName.value: '';
    this.userUpdateRequest.lastName = this.lastName.value?this.lastName.value: '';
    this.userUpdateRequest.email = this.email.value?this.email.value: '';
    this.userUpdateRequest.workingPlaces = this.workingPlaces.value?this.workingPlaces.value: '';
    this.userUpdateRequest.languages = this.languages.value?this.languages.value: '';
    this.userUpdateRequest.skills = this.skills.value?this.skills.value: '';
    this.userUpdateRequest.studyCenter = this.studyCenter.value?this.studyCenter.value: '';
    this.userUpdateRequest.about = this.about.value?this.about.value: '';

    this.userUpdateRequest.companyName = this.companyName.value?this.companyName.value: '';
    this.userUpdateRequest.description = this.description.value?this.description.value: '';
    this.userUpdateRequest.websiteUrl = this.websiteUrl.value?this.websiteUrl.value: '';

    if(this.role = 1){
      this.profileService.updatePostulant(this.userUpdateRequest).subscribe(
        res =>{
          console.log(res)
        }
      )
    } else {
      this.profileService.updateCompany(this.userUpdateRequest).subscribe(
        res =>{
          console.log(res)
        }
      )
    }

  }
}
