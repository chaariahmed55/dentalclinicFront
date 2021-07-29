import { Injectable } from '@angular/core';
import { User } from '../entity/user';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpclient: HttpClient) { }
  readonly host = "http://127.0.0.1:8000/api/login_check";


  public login(param1,param2){
    console.log(param1);
    console.log(param2);
    // let headers = new HttpHeaders().set("Access-Control-Allow-Origin", "*")
    // .set('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS')
    // .set('Access-Control-Allow-Headers',"*")
    // .set('Access-Control-Expose-Headers','Content-Length, X-JSON')
    
    let parametre = new HttpParams().set("username", param1).set("password", param2);
    this.httpclient.post<User>(this.host,JSON.stringify({username: param1, password: param2})).subscribe((res) => {
      console.log(res);
    });
  }





}

