import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import {User} from '../../models/auth/user';

@Injectable({
  providedIn: "root",
})
export class CecyService {
  headers: HttpHeaders;
  user: User;

  constructor(private _http: HttpClient) {
    localStorage.setItem("accessToken", "pruebas");
  }

  get(url: string) {
    this.headers = new HttpHeaders()
      .set("X-Requested-With", "XMLHttpRequest")
      .append("Content-Type", "application/json")
      .append("Accept", "application/json")
      .append(
        "Authorization",
        "Bearer " + localStorage.getItem("accessToken").replace('"', "")
      );
    url = environment.API_URL_CECY + url;
    return this._http.get(url, { headers: this.headers });
  }

  post(url: string, data: any) {
    this.headers = new HttpHeaders()
      .set("X-Requested-With", "XMLHttpRequest")
      .append("Content-Type", "application/json")
      .append("Accept", "application/json")
      .append(
        "Authorization",
        "Bearer " + localStorage.getItem("accessToken").replace('"', "")
      );
    url = environment.API_URL_CECY + url;
    return this._http.post(url, data, { headers: this.headers });
  }

  update(url: string, data: any) {
    this.headers = new HttpHeaders()
      .set("X-Requested-With", "XMLHttpRequest")
      .append("Content-Type", "application/json")
      .append("Accept", "application/json")
      .append(
        "Authorization",
        "Bearer " + localStorage.getItem("accessToken").replace('"', "")
      );
    url = environment.API_URL_CECY + url;
    return this._http.put(url, data, { headers: this.headers });
  }

  delete(url: string) {
    this.headers = new HttpHeaders()
      .set("X-Requested-With", "XMLHttpRequest")
      .append("Content-Type", "application/json")
      .append("Accept", "application/json")
      .append(
        "Authorization",
        "Bearer " + localStorage.getItem("accessToken").replace('"', "")
      );
    url = environment.API_URL_CECY + url;
    return this._http.delete(url, { headers: this.headers });
  }

  academic_record() {
    this.user = JSON.parse(localStorage.getItem('user')) as User;
      const url = environment.API_URL_CECY + 'academic_record'+ this.user.id;
      this.headers = new HttpHeaders().set('Content-Type', 'application/json').append('X-Requested-With', 'XMLHttpRequest');
      return this._http.get(url);
  }
}
