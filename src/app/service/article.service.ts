import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Article} from '../entity/Article';
import {Subject} from 'rxjs';
import {Image} from '../entity/Image';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  // attributes
    private url = 'http://127.0.0.1:8000/article/';
    private urlupload = 'http://127.0.0.1:5000/upload';
    listners = new Subject<any>();

  private headers: HttpHeaders = new HttpHeaders({
    'Access-Control-Allow-Origin': 'http://127.0.0.1', // allow all origin address
    'Access-Control-Allow-Methods': 'GET, POST , PUT , DELETE', // allow all methods http request (GET, POST, DELETE ...)
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept, Accept-Language, X-Authorization', // allow setting any header
    'Content-Type': 'application/json', // content type data as json
  });

  constructor(private httpClient: HttpClient) { }

  // get all article
  getAllArticle(): Observable<Article[]> {
    return this.httpClient.get<any>(this.url + 'getall');
  }

  // get article by id
  public getArticleById(id: number): Observable<Article> {
    return  this.httpClient.get<any>(this.url + 'getArticle/' + id);
  }
   // add Article
   public addArticle(param: Article){
    const parametre = new HttpParams().set('description', param.description).set('imagepath', param.imagepath)
      .set('date', param.date).set('title', param.title).set('user', '1');
    console.log(param.imagepath);
    console.log('3', parametre);
    return this.httpClient.post(this.url + 'add' , parametre);
  }

  // upload photo
   uploadPhoto(photo: any): Observable<Image> {
     console.log(photo);
     return this.httpClient.post<Image>(this.urlupload, photo);

   }
  // edit article
  updateArticle(param: Article) {
    console.log('2', param);
    const parametre = new HttpParams().set('description', param.description).set('imagepath', param.imagepath)
      .set('date', param.date).set('title', param.title).set('user', '1');
    this.httpClient.post(this.url + 'edit/' + param.id, parametre).subscribe((res) => {
      console.log(res);
    });
  }

  // delete Article
  deleteArticle(idArticle: number) {
    return this.httpClient.delete(this.url + 'delete/' + idArticle);
  }

  listen(): Observable<any>{
    return this.listners.asObservable();
  }

  filter(filterBy: string){
    this.listners.next(filterBy);
  }

  // search articles by title
  public searchbyTitle(): Observable<Article[]> {
    return this.httpClient.get<any>(this.url + 'searchBytitle');
  }
}
