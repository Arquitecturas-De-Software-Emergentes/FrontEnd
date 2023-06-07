import {Component, OnInit} from '@angular/core';
import {HomeServicesService} from "../home-services.service";
import {JobOfferServicesService} from "../../components/job-offer/job-offer-services.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-favorite-job-offer-list',
  templateUrl: './favorite-job-offer-list.component.html',
  styleUrls: ['./favorite-job-offer-list.component.css']
})
export class FavoriteJobOfferListComponent implements OnInit{
  jobOffers: any = []

  constructor(private homeService: HomeServicesService, private jobOfferService: JobOfferServicesService) {
  }
  ngOnInit(): void {
    // this.getAllJobOffers().then()
    this.homeService.getFavoriteJobOffers(Number(sessionStorage.getItem('userId'))).subscribe(
      async data => {
        console.log(data.data)
        for (let jobOffersKey of data.data) {
          console.log(jobOffersKey)
          this.getJobOfferById(jobOffersKey.jobOfferId).then();
        }

      }, error => {
    }
    )
  }

  async getJobOfferById(jobOfferId: number){
    return this.jobOfferService.getJobOfferById(jobOfferId).subscribe(
      data=>{
        this.jobOffers.push(data.data);
        this.getCompanyById(data.data.id, data.data.companyId)
      }
    )
  }

  // async getAllJobOffers(){
  //   this.jobOfferService.getAllJobOffers().subscribe(
  //     async data => {
  //       this.jobOffers = data.data;
  //       for (let jobOffersKey of this.jobOffers) {
  //         await this.getCompanyById(jobOffersKey.id, jobOffersKey.companyId);
  //       }
  //     },
  //     error => {
  //       console.error('error :y');
  //     }
  //   )
  // }

  async getCompanyById(id: number, companyId: number): Promise<any>{
    this.homeService.getCompanyById(companyId).pipe().subscribe(
      data => {
        for (let jobOffersKey of this.jobOffers) {
          if(jobOffersKey.id == id) jobOffersKey.companyName = data.data.companyName;
        }
      },
      error => { return '';}
    );
  }
}
