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
  actualDate: string = "";
  validation: boolean = false;
  checkedIds: any[] = [];
  constructor(private route: ActivatedRoute, private homeServicesService: HomeServicesService) {
    this.setActualDate();
    console.log(this.actualDate)
  }
  ngOnInit(): void {

    this.route.params.pipe(
      map(params => params['id'])
    ).subscribe(id => {
      // Utilizar el valor del parámetro
      console.log('El valor del parámetro "id" es:', id);
      if(id != 0) this.homeServicesService.getPostulationsByJobOfferId(id).subscribe(x=>{
        console.log(x)
        for( let i=0; i<x.length; i++){
          this.homeServicesService.getCandidatesByJobOfferId(x[i].id).subscribe(y=>{y.checked = false; this.candidates.push(y)})
        }
      })
    });
  }

  setActualDate(){
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    this.actualDate = `${year}-${month}-${day}`;
  }


  updateCheckedList() {
    for (let i in this.candidates){

    }
  }
}
