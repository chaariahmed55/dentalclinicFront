import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Commentaire} from '../entity/Commentaire';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  // attributes
  private url = 'http://127.0.0.1:8000/commentaire/';
  constructor(private httpClient: HttpClient) { }

  // get all commentaire
  getAllCommentaire(): Observable<Commentaire[]> { // retoure de l api
    return this.httpClient.get<any>(this.url + 'getall');
  }


  // get comment by id article
  public getCommentsByArticle(id: number): Observable<Commentaire[]> {
    return  this.httpClient.get<any>(this.url + 'getComments/' + id);
  }

  // add commentaire
  public addCommentaire(param: Commentaire){
    const parametre = new HttpParams().set('comment', param.comment)
      .set('date', param.date)
      .set('article', param.article.toString());
    console.log(param.comment);
    this.httpClient.post(this.url + 'add' , parametre).subscribe((res) => {
    });
  }

  // edit commentaire
  updateCommentaire(param: Commentaire) {
    console.log('2', param);
    const parametre = new HttpParams().set('comment', param.comment).set('date', param.date)
      .set('article', param.article.toString());
    return this.httpClient.post(this.url + 'edit/' + param.id, parametre);
  }

  // delete commentaire
  deleteCommentaire(id: number) {
    console.log(this.url + id + '/delete');
    return this.httpClient.delete(this.url + 'delete/' + id);
  }

}
