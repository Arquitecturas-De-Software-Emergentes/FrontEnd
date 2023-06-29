import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JobOfferServicesService {
  private apiUrl= "http://localhost:3000/JobOffers";
  constructor(private http: HttpClient) {
  }
  getJobOffersByCompanyId(companyId:number):Observable<any>{
    return this.http.get<any>(this.apiUrl + `/?companyId=${companyId}`);
  }
  getAllJobOffers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getJobOfferById(jobOfferId:number):Observable<any>{
    return this.http.get<any>(this.apiUrl + `?id=${jobOfferId}`);
  }

  addJobOffer(jobOffer:any):Observable<any>{
    return this.http.post<any>(this.apiUrl, jobOffer);
  }

  updateJobOffer(jobOffer:any):Observable<any>{
    return this.http.put<any>(this.apiUrl+ `/${jobOffer.id}`, jobOffer);
  }

  deleteJobOfferById(jobOfferId:number):Observable<any>{
    return this.http.delete<any>(this.apiUrl + `/${jobOfferId}`);
  }

}
