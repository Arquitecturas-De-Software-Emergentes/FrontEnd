import { Injectable } from '@angular/core';
import {environment} from "../../../environment";
import {HttpClient} from "@angular/common/http";
import {SignInFormResponse} from "../response/signInFormResponse";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  postulantSignIn(data: any){
    let url = this.baseUrl + '/Postulant/Login';
    return this.httpClient.post<SignInFormResponse>(url, data);
  }
  employerSignIn(data: any){
    let url = this.baseUrl + '/Company/Login';
    return this.httpClient.post<SignInFormResponse>(url, data);
  }

  getUsers(){
    return this.httpClient.get("http://localhost:3000/users")
  }
}
