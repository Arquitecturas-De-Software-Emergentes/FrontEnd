import {Component, OnInit} from '@angular/core';
import {HomeServicesService} from "../../../home/home-services.service";
import {map} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-job-offer-candidates',
  templateUrl: './job-offer-candidates.component.html',
  styleUrls: ['./job-offer-candidates.component.css']
})
export class JobOfferCandidatesComponent implements OnInit{

  candidates : any[] = [];
  selectedDate: string = "";
  selectedTime: string = "";
  interviewLink: string = "";
  actualDate: string = "";
  validation: boolean = false;
  checkedIds: any[] = [];
  jobOfferId: number = -1;
  interviews: any[] = [];
  isEdit: boolean = false;
  interviewId: number = -1;
  constructor(private route: ActivatedRoute, private homeServicesService: HomeServicesService) {
    this.setActualDate();
    console.log(this.actualDate)
  }
  ngOnInit(): void {

    this.route.params.pipe(
      map(params => params['id'])
    ).subscribe(id => {
      // Utilizar el valor del parámetro
      this.jobOfferId = id;
      if(id != 0)
      {
        this.loadInterviews(this.jobOfferId);
        this.homeServicesService.getPostulationsByJobOfferId(id).subscribe(x=>{
          console.log(x)
          for( let i=0; i<x.length; i++){
            this.homeServicesService.getCandidatesByJobOfferId(x[i].id).subscribe(y=>{y.checked = false; this.candidates.push(y)})
          }
        })

      }

    });
  }

  loadInterviews(id: number){
    this.homeServicesService.getInterviewsByJobOfferId(id).subscribe(y=>{this.interviews=(y)})
  }

  setActualDate(){
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    this.actualDate = `${year}-${month}-${day}`;
  }


  updateCheckedList() {
    this.checkedIds = []
    this.candidates.forEach((x)=>{
      console.log(x)
      if(x.checked){
        this.checkedIds.push(x.id);
      }
    })
    console.log(this.checkedIds);
  }

  saveInterview() {

    let interview = {
      "jobOfferId": this.jobOfferId,
      "candidates": this.checkedIds,
      "interviewLink": this.interviewLink,
      "date": this.selectedDate,
      "time": this.selectedTime
    }
    if(!this.isEdit){
      console.log(this.interviews)
      console.log(interview)
      if(this.interviews.some(x=> x.date == interview.date && x.time==interview.time)){
        alert("Ya existe una entrevista agendada este dia y hora.")
        return
      }
      this.homeServicesService.postInterview(interview).subscribe(x=>{this.loadInterviews(this.jobOfferId)});
    } else {
      this.homeServicesService.putInterview(this.interviewId, interview).subscribe(x=>{this.loadInterviews(this.jobOfferId)});
    }

  }

  cleanForm(){
    this.interviewId = -1;
    this.isEdit = false;
    this.checkedIds=[]
    this.candidates.forEach((y)=>{
      y.checked = false;
    })
    this.interviewLink = "";
    this.selectedDate = "";
    this.selectedTime = "";
  }

  loadInterview(interview: any) {
    this.cleanForm()
    this.interviewId = interview.id
    this.isEdit = true;
    this.checkedIds = interview.candidates;
    let ar = interview.candidates as Array<any>;
    ar.forEach((x)=>{
      this.candidates.forEach((y)=>{
        if(y.id==x) y.checked = true;
      })
    })
    this.interviewLink = interview.interviewLink;
    this.selectedDate = interview.date;
    this.selectedTime = interview.time;
  }
}
