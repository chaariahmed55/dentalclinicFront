import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Medicament } from '../entity/medicament';

@Injectable({
  providedIn: 'root'
})
export class MedicamentService {

  constructor(private httpClient: HttpClient) { }
  readonly host = environment.baseurl;

  public addmedicament(param:Medicament){
    let parametre = new HttpParams().set('quantiteparjour', param.quantiteparjour.toString()).set('quantitepardose', param.quantitepardose.toString()).set('dure', param.dure.toString()).set('nom', param.nom).set('fiche',param.fiche.toString());
    this.httpClient.post(this.host+'/medicament/add' ,parametre).subscribe((res) => {
      console.log(res);
    });
  }

  public getonemedicament(param){
    console.log("id of fiche",param);
    return this.httpClient.get<Medicament>(this.host+'/medicament/get/'+param);
  }

  public updatemedicament(param:Medicament){
    console.log("medicament service ",param);
    let parametre = new HttpParams().set('quantiteparjour', param.quantiteparjour.toString()).set('quantitepardose', param.quantitepardose.toString()).set('dure', param.dure.toString()).set('nom', param.nom);
    this.httpClient.post(this.host+'/medicament/edit/'+ param.id ,parametre).subscribe((res) => {
      console.log(res);
    });
  }






}
