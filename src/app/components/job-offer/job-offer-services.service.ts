import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JobOfferServicesService {
  private apiUrl= "https://jobagdb.azurewebsites.net/api/JobOffer";
  constructor(private http: HttpClient) {
  }
  getJobOffersByCompanyId(companyId:number):Observable<any>{
    return this.http.get<any>(this.apiUrl + `/GetByCompany?id=${companyId}`);
  }
  getAllJobOffers(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/GetAll");
  }
  getJobOfferById(jobOfferId:number):Observable<any>{
    return this.http.get<any>(this.apiUrl + `/Get?jobOfferId=${jobOfferId}`);
  }

  addJobOffer(jobOffer:any):Observable<any>{
    return this.http.post<any>(this.apiUrl + `/Add`, jobOffer);
  }

  updateJobOffer(jobOffer:any):Observable<any>{
    return this.http.put<any>(this.apiUrl + `/Update`, jobOffer);
  }

  deleteJobOfferById(jobOfferId:number):Observable<any>{
    return this.http.delete<any>(this.apiUrl + `/Get?jobOfferId=${jobOfferId}`);
  }

}
