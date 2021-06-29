import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../entity/user';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private httpClient: HttpClient) { }
  readonly host = environment.baseurl;
  public getart():Observable<User[]> {
    console.log(this.host);
    return this.httpClient.get<User[]>(this.host+'/user/getall');

  }



}
