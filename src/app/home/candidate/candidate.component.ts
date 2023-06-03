import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {HomeServicesService} from "../home-services.service";
import {JobOfferServicesService} from "../../components/job-offer/job-offer-services.service";

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit{
  emailFormControl = new FormControl('', [Validators.required]);
  jobOffers: any[] = [];
  companies: any[] = [];
  filteredJobOffers: any[] = [];
  searchText: string = "";
  constructor(private homeService: HomeServicesService, private jobOfferService: JobOfferServicesService) {
  }
  ngOnInit(): void {
    this.getAllJobOffers();
  }

  async getAllJobOffers(){
    this.jobOfferService.getAllJobOffers().subscribe(
      async data => {
        this.jobOffers = data.data;
        for (let jobOffersKey of this.jobOffers) {
          this.getCompanyById(jobOffersKey.id, jobOffersKey.companyId);
        }
        this.applyFilter();
      },
      error => {
        console.error('error :y');
      }
    )
  }

  getCompanyName(id: number){
    for (let x of this.companies){
      if(x.id == id){
        return x.name;
      }
    }
    return '';
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

  applyFilter() {
    this.filteredJobOffers = this.jobOffers.filter(jobOffer => {
      const searchLower = this.searchText.toLowerCase();
      return (
        jobOffer.title.toLowerCase().includes(searchLower) ||
        jobOffer.companyName.toLowerCase().includes(searchLower) ||
        jobOffer.description.toLowerCase().includes(searchLower)
      );
    });
  }

}
