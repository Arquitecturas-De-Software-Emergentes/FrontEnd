import {Component, OnInit} from '@angular/core';
import {HomeServicesService} from "../home-services.service";
import {JobOfferServicesService} from "../../components/job-offer/job-offer-services.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-postulation-list',
  templateUrl: './postulation-list.component.html',
  styleUrls: ['./postulation-list.component.css']
})
export class PostulationListComponent implements OnInit{
  jobOffers: any = []
  interviews: any[] = [];
  userId: number;
  selectedJobOffer: any = null;

  constructor(private homeService: HomeServicesService, private jobOfferService: JobOfferServicesService) {
    this.userId = Number(sessionStorage.getItem('userId'))
  }
  ngOnInit(): void {
    // this.getAllJobOffers().then()

    this.homeService.getJobOfferPostulations(this.userId).subscribe(
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

  async loadInterviews(id: number, jobOffer: any){
    this.selectedJobOffer = null;
    this.selectedJobOffer = jobOffer;
    await this.homeService.getInterviewsByJobOfferId(id).subscribe((x)=>{
      this.interviews = []
      console.log(x)
      let arr = x as Array<any>
      arr.forEach(y=>{
        let arr1 = y.candidates as Array<any>
        arr1.forEach(z=>{
          if(z===this.userId){
            this.interviews.push(y)
          }
        })
      })
    }, )
  }

  async getCompanyById(id: number, companyId: number): Promise<any>{
    this.homeService.getCompanyById(companyId).pipe().subscribe(
      data => {
        for (let jobOffersKey of this.jobOffers) {
          console.log(jobOffersKey)
          console.log("gato")
          if(jobOffersKey.id == id) jobOffersKey.companyName = data.companyName;
        }
      },
      error => { return '';}
    );
  }


}
