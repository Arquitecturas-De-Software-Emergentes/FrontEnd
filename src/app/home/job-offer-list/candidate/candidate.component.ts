import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {HomeServicesService} from "../../home-services.service";
import {JobOfferServicesService} from "../../../components/job-offer/job-offer-services.service";
import {Router} from "@angular/router";

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
  companyFilter: string = "";
  wageRanges: any[] = [[0, 1000],[1001, 3000],[3001, 5000],[5001, 10000]];
  wageRange: any = -1;

  constructor(private router: Router, private homeService: HomeServicesService, private jobOfferService: JobOfferServicesService) {
  }
  ngOnInit(): void {
    this.getAllJobOffers();
  }

  loadJobOfferView(id: number) {
    this.router.navigate([`home/job-offer-view/${id}`]).then(r => r);
  }

  async getAllJobOffers(){
    this.jobOfferService.getAllJobOffers().subscribe(
      async data => {
        this.jobOffers = data;
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
        if(!this.companies.some(p=>p.id === data.id)) this.companies.push(data);
        for (let jobOffersKey of this.jobOffers) {
          if(jobOffersKey.id == id) jobOffersKey.companyName = data.companyName;
        }
      },
      error => { return '';}
    );
  }
  filterByCompanyName() {
    this.filteredJobOffers = this.jobOffers.filter(jobOffer => {
      let searchLower = this.companyFilter.toLowerCase();
      if (this.companyFilter == "") searchLower = "";
      return (
        jobOffer.companyName.toLowerCase().includes(searchLower)
      );
    });
  }
  filterByWage() {
    this.filteredJobOffers = this.jobOffers.filter(jobOffer => {
      if (this.wageRange == -1) return (jobOffer)
      return (
        jobOffer.wage >= this.wageRanges[this.wageRange][0] && jobOffer.wage <= this.wageRanges[this.wageRange][1]
      );
    });
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

  protected readonly Number = Number;
}
