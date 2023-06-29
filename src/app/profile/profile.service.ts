import { Injectable } from '@angular/core';
import {environment} from "../../../environment";
import {HttpClient} from "@angular/common/http";
import {InfoUserResponse} from "../response/InfoUserResponse";
import {UserUpdateRequest} from "../request/userUpdateRequest";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getPostulant(Id: String){
    let url = this.baseUrl + 'candidates?id='+ Id;
    return this.httpClient.get<InfoUserResponse>(url);
  }

  getCompany(Id: String){
    let url = this.baseUrl + 'companies?id='+ Id;
    return this.httpClient.get<InfoUserResponse>(url);
  }

  updatePostulant(data: UserUpdateRequest){
    let url = this.baseUrl + 'candidates';
    return this.httpClient.put(url, data);
  }

  updateCompany(data: UserUpdateRequest){
    let url = this.baseUrl + 'company';
    return this.httpClient.put(url, data);
  }
}
