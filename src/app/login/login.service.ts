import { Injectable } from '@angular/core';
import {environment} from "../../../environment";
import {HttpClient} from "@angular/common/http";
import {SignInFormResponse} from "../response/signInFormResponse";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = "http://localhost:3000/";

  constructor(private httpClient: HttpClient) { }

  candidateSignIn(data: any){
    let url = this.baseUrl + 'candidates';
    // return this.httpClient.post<SignInFormResponse>(url, data);
    return this.httpClient.get(url+`?email=${data.email}&password=${data.password}`);
  }
  companySignIn(data: any){
    let url = this.baseUrl + 'companies';
    return this.httpClient.get(url+`?email=${data.email}&password=${data.password}`);
  }

}
