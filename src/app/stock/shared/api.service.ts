import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Myresult } from '../utils/myresult';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly ApiURL = "http://localhost:6662/";

  constructor(private http:HttpClient) { }

  getRequest(url: string) : Observable<Myresult>
  {
    return this.http.get<Myresult>(this.ApiURL+url);
  }

  postRequest( data: any, url: string): Observable<Myresult>
  {
    return this.http.post<Myresult>(this.ApiURL+url, data);
  }

}
