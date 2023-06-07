import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {HomeServicesService} from "../../home-services.service";
import {NavigationExtras, Router} from "@angular/router";
import {JobOfferServicesService} from "../../../components/job-offer/job-offer-services.service";

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css']
})
export class EmployerComponent implements OnInit{
  emailFormControl = new FormControl('', [Validators.required]);
  jobOffers: any[] = [];
  companies: any[] = [];
  filteredJobOffers: any[] = [];
  searchText: string = "";
  companyId: number = 0;
  constructor(private router: Router, private homeService: HomeServicesService, private jobOfferService: JobOfferServicesService) {
  }
  ngOnInit(): void {
    this.companyId = Number(sessionStorage.getItem('userId'));

    this.getJobOffersByCompanyId(this.companyId).then();
  }

  // async getAllJobOffers(){
  //   this.homeService.getAllJobOffers().subscribe(
  //     async data => {
  //       this.jobOffers = data.data;
  //       for (let jobOffersKey of this.jobOffers) {
  //         await this.getCompanyById(jobOffersKey.id, jobOffersKey.companyId);
  //       }
  //       this.applyFilter();
  //     },
  //     error => {
  //       console.error('error :y');
  //     }
  //   )
  // }

  deleteOfferById(id: number){
    this.jobOfferService.deleteJobOfferById(id).subscribe();
  }
  async getJobOffersByCompanyId(id: number){
    this.jobOfferService.getJobOffersByCompanyId(id).subscribe(
      async data => {
        this.jobOffers = data.data;
        for (let jobOffersKey of this.jobOffers) {
          await this.getCompanyById(jobOffersKey.id, jobOffersKey.companyId);
        }
        this.applyFilter();
      },
      error => {
        console.error('error :y');
      }
    )
  }
  addJobOffer(){
    this.router.navigate([`home/job-offer-form/0`]).then(r => r);
  }
  editJobOffer(id: number){

    this.router.navigate([`home/job-offer-form/${id}`]).then(r => r);
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