import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HomeServicesService {
  private apiUrl= "http://localhost:3000";
  constructor(private http: HttpClient) {
  }
  getCompanyById(id:number): Observable<any> {
    return this.http.get<any>(this.apiUrl+`/Companies/${id}`);
  }

  getPostulationsByJobOfferId(id:number): Observable<any> {
    return this.http.get<any>(this.apiUrl+`/Postulations?jobOfferId=${id}`);
  }

  getCandidatesByJobOfferId(id:number): Observable<any> {
    return this.http.get<any>(this.apiUrl+`/Candidates/${id}`);
  }

  postFavoriteJobOffer(favorite:any): Observable<any> {
    return this.http.post<any>(this.apiUrl+`/SavedJobOffers`, favorite);
  }

  deleteFavoriteJobOffer(id:any): Observable<any> {
    return this.http.delete<any>(this.apiUrl+`/SavedJobOffers/`+id);
  }

  postJobOfferPostulation(postulation:any): Observable<any> {
    return this.http.post<any>(this.apiUrl+`/Postulations`, postulation);
  }

  getFavoriteJobOffers(postulantId: number): Observable<any>{
    return this.http.get<any>(this.apiUrl+ `/SavedJobOffers?candidateId=${postulantId}`);
  }

  getFavoriteJobOffersByIdAndJobOfferId(postulantId: number, jobOfferId: number): Observable<any>{
    return this.http.get<any>(this.apiUrl+ `/SavedJobOffers?candidateId=${postulantId}&jobOfferId=${jobOfferId}`);
  }

  getJobOfferPostulationsByIdAndJobOfferId(postulantId: number, jobOfferId: number): Observable<any>{
    return this.http.get<any>(this.apiUrl+ `/Postulations?candidateId=${postulantId}&jobOfferId=${jobOfferId}`);
  }

  getJobOfferPostulations(postulantId: number): Observable<any>{
    return this.http.get<any>(this.apiUrl+ `/Postulations?candidateId=${postulantId}`);
  }

  postInterview(interview: any) {
    return this.http.post<any>(this.apiUrl+`/Interviews`, interview);
  }

  getInterviewsByJobOfferId(jobOfferId: number) {
    return this.http.get<any>(this.apiUrl+ `/Interviews?jobOfferId=${jobOfferId}`);
  }

  putInterview(interviewId: number, interview: any) {
    return this.http.put<any>(this.apiUrl+ `/Interviews/${interviewId}`, interview);
  }
}
