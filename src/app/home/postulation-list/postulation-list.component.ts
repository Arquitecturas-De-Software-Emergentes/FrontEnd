import {Component, OnInit} from '@angular/core';
import {HomeServicesService} from "../home-services.service";
import {JobOfferServicesService} from "../../components/job-offer/job-offer-services.service";

@Component({
  selector: 'app-postulation-list',
  templateUrl: './postulation-list.component.html',
  styleUrls: ['./postulation-list.component.css']
})
export class PostulationListComponent implements OnInit{
  jobOffers: any = []

  constructor(private homeService: HomeServicesService, private jobOfferService: JobOfferServicesService) {
  }
  ngOnInit(): void {
    // this.getAllJobOffers().then()
  }

  async getAllJobOffers(){
    this.jobOfferService.getAllJobOffers().subscribe(
      async data => {
        this.jobOffers = data.data;
        for (let jobOffersKey of this.jobOffers) {
          await this.getCompanyById(jobOffersKey.id, jobOffersKey.companyId);
        }
      },
      error => {
        console.error('error :y');
      }
    )
  }

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
