import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { map } from 'rxjs/operators';
import {HomeServicesService} from "../../../home/home-services.service";
import {JobOfferServicesService} from "../job-offer-services.service";
@Component({
  selector: 'app-job-offer-view',
  templateUrl: './job-offer-view.component.html',
  styleUrls: ['./job-offer-view.component.css']
})
export class JobOfferViewComponent implements OnInit{
  id: number = 0;
  jobOffer: any = {};
  constructor(private route: ActivatedRoute, private jobOfferService: JobOfferServicesService) {
  }
  ngOnInit(): void {
    this.route.params.pipe(
      map(params => params['id'])
    ).subscribe(id => {
      // Utilizar el valor del parámetro
      console.log('El valor del parámetro "id" es:', id);
      this.getJobOfferById(id);
    });
  }

  getJobOfferById(id: number) {
    this.jobOfferService.getJobOfferById(id).subscribe(
      data => {
          this.jobOffer = data.data;
      },
      error => { return '';}
    );
  }

}
