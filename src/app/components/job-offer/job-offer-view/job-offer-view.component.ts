import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { map } from 'rxjs/operators';
import {HomeServicesService} from "../../../home/home-services.service";
import {JobOfferServicesService} from "../job-offer-services.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
@Component({
  selector: 'app-job-offer-view',
  templateUrl: './job-offer-view.component.html',
  styleUrls: ['./job-offer-view.component.css']
})
export class JobOfferViewComponent implements OnInit{
  id: number = 0;
  jobOffer: any = {};
  isFavorite: boolean = false;
  isPostulated: boolean = false;
  constructor(private route: ActivatedRoute, private jobOfferService: JobOfferServicesService, private homeServicesService: HomeServicesService) {
  }
  ngOnInit(): void {
    this.route.params.pipe(
      map(params => params['id'])
    ).subscribe(id => {
      // Utilizar el valor del parámetro
      console.log('El valor del parámetro "id" es:', id);
      this.getJobOfferById(id);
      this.isFavorite = this.validFavorite(Number(sessionStorage.getItem('userId')), id);
      this.isPostulated = this.validPostulate(Number(sessionStorage.getItem('userId')), id);
    });

  }

  getJobOfferById(id: number) {
    this.jobOfferService.getJobOfferById(id).subscribe(
      data => {
          this.jobOffer = data[0];
          this.homeServicesService.getCompanyById(this.jobOffer.companyId).subscribe(x=>{
            this.jobOffer.companyName = x.companyName;
          })
      },
      error => { return '';}
    );
  }

  validFavorite(userId:number, jobOfferId:number):boolean{
    this.homeServicesService.getFavoriteJobOffersByIdAndJobOfferId(userId, jobOfferId).subscribe(
      x => {
        if (x.length == 0) this.isFavorite = true
      }, error => {}
    );
    return false
  }

  validPostulate(userId:number, jobOfferId:number):boolean{
    this.homeServicesService.getJobOfferPostulationsByIdAndJobOfferId(userId, jobOfferId).subscribe(
      x => {
        if (x.length == 0) this.isPostulated = true
      }, error => {}
    );
    return false
  }
  addToFavorites() {
    const result = window.confirm('¿Estás seguro de que deseas realizar esta acción?');
    if (result) {
      this.isFavorite = false
      this.homeServicesService.postFavoriteJobOffer({candidateId: Number(sessionStorage.getItem('userId')), jobOfferId: this.jobOffer.id}).subscribe();
    } else {
      // Aquí puedes colocar la lógica que deseas ejecutar si el usuario hace clic en "Cancelar".
    }
  }

  postulate() {
    const result = window.confirm('¿Estás seguro de que deseas postular a esta oferta?');
    if (result) {
      this.isPostulated = false
      this.homeServicesService.postJobOfferPostulation({candidateId: Number(sessionStorage.getItem('userId')), jobOfferId: this.jobOffer.id}).subscribe();
    } else {
      // Aquí puedes colocar la lógica que deseas ejecutar si el usuario hace clic en "Cancelar".
    }
  }
}
