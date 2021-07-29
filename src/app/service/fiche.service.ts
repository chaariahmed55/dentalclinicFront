import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fiche } from '../entity/fiche';
import  {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FicheService {

  constructor(private httpClient: HttpClient) { }
  readonly host = environment.baseurl;
  
  public getfichebyuser(param1,param2){
    return this.httpClient.get<Fiche[]>(this.host+'/fiche/getallbyusers/'+param1+'&'+param2);
  }

  public addfiche(param:Fiche){
    let today = new Date();
    let date=today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate();
    let parametre = new HttpParams().set('user', param.user.toString())
    .set('description', param.description).set('date',date)
    this.httpClient.post(this.host+'/fiche/add' ,parametre).subscribe((res) => {
      console.log(res);
    });
  }

  public updatefiche(param:Fiche){
    let parametre = new HttpParams().set('description', param.description)
    this.httpClient.post(this.host+'/fiche/edit/'+ param.id ,parametre).subscribe((res) => {
      console.log(res);
    });
  }

  public recherche(param1,param2){
    return this.httpClient.get<Fiche[]>(this.host+'/fiche/getbydate/'+param1+'&'+param2);
  }

  public getallpages(param){
    return this.httpClient.get<any>(this.host+'/fiche/getallfiche/'+param).pipe(map((res)=> {return res;}));
  }



}
