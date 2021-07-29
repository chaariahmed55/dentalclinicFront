import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../entity/user';
import { environment } from 'src/environments/environment';
import  {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  param:User;
  constructor(private httpClient: HttpClient) { }
  readonly host = environment.baseurl;


  public getalluser(param) {
    console.log(this.host);
    return this.httpClient.get<User[]>(this.host+'/user/getall/'+param);
  }

  public getonuser(param){
    return this.httpClient.get<User>(this.host+'/user/getone/'+param);
  }
  public getonedocteur(){
    return this.httpClient.get<User>(this.host+'/user/getonedocteur').pipe(map((res)=> {return res;}));
  }
  public getonesecretaire():any{
    return this.httpClient.get<User>(this.host+'/user/getonesecretaire').pipe(map((res)=> {return res;}));
  }
  public getallpages(){
    return this.httpClient.get<any>(this.host+'/user/maxpage').pipe(map((res)=> {return res;}));
  }

  public updateuser(param:User){
    let parametre = new HttpParams().set('username', param.username).set('nom', param.nom).set('prenom', param.prenom).set('password', param.password)
    .set('adresse', param.adresse).set('birthdate', param.birthdate).set('telephone', param.telephone.toString())
    .set('email', param.email).set('role', param.role.id.toString())   
    this.httpClient.post(this.host+'/user/edit/'+ param.id ,parametre).subscribe((res) => {
      console.log(res);
    });
  }

  public adduser(param:User){
    console.log('2',param);
    let parametre = new HttpParams().set('username', param.username).set('nom', param.nom).set('prenom', param.prenom).set('password', param.password)
    .set('adresse', param.adresse).set('birthdate', param.birthdate).set('telephone', param.telephone.toString())
    .set('email', param.email).set('role','11')
    console.log('3',parametre);
    this.httpClient.post(this.host+'/user/add' ,parametre).subscribe((res) => {
      console.log(res);
    });
  }

  public deleteuser(param:User){
    this.httpClient.post(this.host+'/user/delete/'+param.id,param).subscribe((res) => {
      console.log(res);
    });
  }

public recherche(param){
  console.log("param",param);
  return this.httpClient.get<User[]>(this.host+'/user/getbynom/'+param);
}

public fexture(){
  return this.httpClient.post(this.host+'/fixture',null).subscribe((res)=>{console.log(res);
  });
}


}
