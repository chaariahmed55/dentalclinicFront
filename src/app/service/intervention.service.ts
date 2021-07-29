import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Intervention } from '../entity/intervention';

@Injectable({
  providedIn: 'root'
})
export class InterventionService {

  constructor(private httpClient: HttpClient) { }
  readonly host = environment.baseurl;

  public addintervention(param:Intervention){
    let parametre = new HttpParams().set('type', param.type).set('prix', param.prix.toString()).set('fiche',param.fiche.toString())
    this.httpClient.post(this.host+'/intervention/add' ,parametre).subscribe((res) => {
      console.log(res);
    });
  }

  public getoneintervention(param){
    console.log("id of fiche",param);
    return this.httpClient.get<Intervention>(this.host+'/intervention/get/'+param);
  }

  public updateintervention(param:Intervention){
    let parametre = new HttpParams().set('type', param.type).set('prix', param.prix.toString())
    this.httpClient.post(this.host+'/intervention/edit/'+ param.id ,parametre).subscribe((res) => {
      console.log(res);
    });
  }


}
