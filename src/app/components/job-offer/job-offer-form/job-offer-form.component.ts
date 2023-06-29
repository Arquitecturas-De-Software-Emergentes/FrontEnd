import {Component, OnInit} from '@angular/core';
import {map} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {JobOfferServicesService} from "../job-offer-services.service";

@Component({
  selector: 'app-job-offer-form',
  templateUrl: './job-offer-form.component.html',
  styleUrls: ['./job-offer-form.component.css']
})
export class JobOfferFormComponent implements OnInit{
  jobOffer: any = {}; // Objeto para almacenar los datos del formulario
  id: number = 0;
  constructor(private route: ActivatedRoute, private jobOfferService: JobOfferServicesService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => params['id'])
    ).subscribe(id => {
      // Utilizar el valor del parámetro
      console.log('El valor del parámetro "id" es:', id);
      this.id = id;
      if(this.id != 0) this.getJobOfferById(id).then();
    });
  }

  submitForm() {
    if (this.id==0 || this.id==null){
      this.jobOffer.hasHired = true;
      this.jobOffer.companyId = Number(sessionStorage.getItem('userId'));
      this.jobOfferService.addJobOffer(this.jobOffer).subscribe(data=>{this.backPage()}, error => {alert('No se pudo completar el proceso.')});
      return
    }
    this.jobOfferService.updateJobOffer(this.jobOffer).subscribe(data=>{this.backPage()}, error => {alert('No se pudo completar el proceso.')});
  }

  backPage(){
    window.history.back();
  }

  async getJobOfferById(id: number) {
    await this.jobOfferService.getJobOfferById(id).subscribe(
      data => {
        this.jobOffer = data[0];
        console.log(this.jobOffer.title)
      },
      error => { return '';}
    );
  }
}
