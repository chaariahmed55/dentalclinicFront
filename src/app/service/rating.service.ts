import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Commentaire} from '../entity/Commentaire';
import {HttpClient} from '@angular/common/http';
import {Rating} from '../entity/Rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  // attributes
  private url = 'http://127.0.0.1:8000/rating/';

  constructor(private httpClient: HttpClient) { }


  // get comment by id article
  public getRatingByArticle(id: number): Observable<Rating[]> {
    return  this.httpClient.get<any>(this.url + 'getRating/' + id);
  }
}
