import {Component, OnInit} from '@angular/core';
import {HomeServicesService} from "../home-services.service";
import {JobOfferServicesService} from "../../components/job-offer/job-offer-services.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {first} from "rxjs";

@Component({
  selector: 'app-favorite-job-offer-list',
  templateUrl: './favorite-job-offer-list.component.html',
  styleUrls: ['./favorite-job-offer-list.component.css']
})
export class FavoriteJobOfferListComponent implements OnInit{
  jobOffers: any[] = []

  constructor(private homeService: HomeServicesService, private jobOfferService: JobOfferServicesService) {
  }
  ngOnInit(): void {
    // this.getAllJobOffers().then()
    this.homeService.getFavoriteJobOffers(Number(sessionStorage.getItem('userId'))).subscribe(
      async data => {
        for (let jobOffersKey of data) {
          this.getJobOfferById(jobOffersKey.jobOfferId).then();
        }

      }, error => {
    }
    )
  }

  async getJobOfferById(jobOfferId: number){
    return this.jobOfferService.getJobOfferById(jobOfferId).subscribe(
      data=>{
        let jobOffer=data[0]
        this.jobOffers.push(jobOffer);
        this.getCompanyById(jobOffer.id, jobOffer.companyId)
      }
    )
  }

  // async getAllJobOffers(){
  //   this.jobOfferService.getAllJobOffers().subscribe(
  //     async data => {
  //       this.jobOffers = data;
  //       for (let jobOffersKey of this.jobOffers) {
  //         await this.getCompanyById(jobOffersKey.id, jobOffersKey.companyId);
  //       }
  //     },
  //     error => {
  //       console.error('error :y');
  //     }
  //   )
  // }
  deleteFavorite(id: number){
    const result = window.confirm('¿Estás seguro de que deseas realizar eliminar esta oferta?');
    if (result) {
      this.homeService.deleteFavoriteJobOffer(id).subscribe(()=>{},()=>{}, () =>{this.jobOffers = this.jobOffers.filter(x=>{return x.id!==id});});
    } else {

    }
  }

  async getCompanyById(id: number, companyId: number): Promise<any>{
    this.homeService.getCompanyById(companyId).pipe().subscribe(
      data => {
        for (let jobOffersKey of this.jobOffers) {
          if(jobOffersKey.id == id) jobOffersKey.companyName = data.companyName;
        }
      },
      error => { return '';}
    );
  }
}
