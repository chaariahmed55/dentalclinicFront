import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../entity/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient) { }

  readonly host = environment.baseurl;
  public getallrole():Observable<Role[]> {
    console.log(this.host);
    return this.httpClient.get<Role[]>(this.host+'/role/getall');

  }




}
