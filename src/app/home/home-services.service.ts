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
  getCompanyById(id:number): Observable<any> {
    return this.http.get<any>(`https://jobagdb.azurewebsites.net/api/Company/Get?companyId=${id}`);
  }

  postFavoriteJobOffer(favorite:any): Observable<any> {
    return this.http.post<any>(`https://jobagdb.azurewebsites.net/api/SavedJobOffers/Add`, favorite);
  }

  getFavoriteJobOffers(postulantId: number): Observable<any>{
    return this.http.get<any>(`https://jobagdb.azurewebsites.net/api/SavedJobOffers/GetByPostulant?id=${postulantId}`);
  }

}
