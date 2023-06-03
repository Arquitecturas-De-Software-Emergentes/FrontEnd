import { Injectable } from '@angular/core';
import {environment} from "../../../environment";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs";
import {PostulantRegisterRequest} from "../request/postulantRegisterRequest";
import {CompanyRegisterRequest} from "../request/companyRegisterRequest";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  PostulantRegister(data: any){
    let url = this.baseUrl + '/Postulant/Register';
    return this.httpClient.post<PostulantRegisterRequest>(url, data);
  }
  CompanyRegister(data: any){
    let url = this.baseUrl + '/Company/Register';
    return this.httpClient.post<CompanyRegisterRequest>(url, data);
  }
}
