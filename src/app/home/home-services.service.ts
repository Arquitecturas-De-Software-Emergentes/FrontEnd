import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HomeServicesService {
  private apiUrl= "https://jobagdb.azurewebsites.net/api/JobOffer/GetAll";
  constructor(private http: HttpClient) {
  }

  getAllJobOffers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getCompanyById(id:number): Observable<any> {
    return this.http.get<any>(`https://jobagdb.azurewebsites.net/api/Company/Get?companyId=${id}`);
  }
}
