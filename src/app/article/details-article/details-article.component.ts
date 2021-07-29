import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../service/article.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Article} from '../../entity/Article';
import {CommentaireService} from '../../service/commentaire.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Commentaire} from '../../entity/Commentaire';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UpdateArticleComponent} from '../update-article/update-article.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UpdateCommentComponent} from '../update-comment/update-comment.component';
import {MatDialog} from '@angular/material/dialog';
import {RatingService} from '../../service/rating.service';
import {Rating} from "../../entity/Rating";

@Component({
  selector: 'app-details-article',
  templateUrl: './details-article.component.html',
  styleUrls: ['./details-article.component.css']
})
export class DetailsArticleComponent implements OnInit {

  private articleid;

  com = new Commentaire();
  detail: any = {};
  id: number;
  listArticle: Article[];
  commentaire: Commentaire[];
  rating: Rating [];
  constructor(private articleService: ArticleService, private activatedRoute: ActivatedRoute ,
              private router: Router, private commentService: CommentaireService, private modalService: NgbModal,
              public dialog: MatDialog, private serviceRating: RatingService) { }

  // form groupe add comment
  CommentForm: FormGroup = new FormGroup({
    comment: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  ngOnInit(): void {
    this.articleid = this.activatedRoute.snapshot.params[`id`];
    console.log(this.articleid);
    this.articleService.getArticleById(this.activatedRoute.snapshot.params.id).subscribe((data: Article) =>
      this.detail = data);
    console.log(this.detail);
    console.log(this.id);
    this.getComment();
  }
  public getComment(){
    this.commentService.getCommentsByArticle(this.detail.id).subscribe(
      (response: Commentaire[]) => {
        this.commentaire = response;
        console.log(this.commentaire);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  addComment(){
    this.com.article = this.articleid;
    console.log(this.com);
    const date = new Date();
    const d = date.getUTCDate();
    const day = (d < 10) ? '0' + d : d;
    const m = date.getUTCMonth() + 1;
    const month = (m < 10) ? '0' + m : m;
    const year = date.getUTCFullYear();
    const loctime = `${year}-${month}-${day}`;
    this.com.date = loctime;
    this.commentService.addCommentaire(this.com);
    this.getComment();
    this.CommentForm.reset();
  }

  // Delete commentaire
  deleteComment(idComment: number): void {
    this.commentService.deleteCommentaire(idComment).subscribe(res => {
      console.log(res);
      console.log('Comment Deleted !');
      this.getComment();
    } , error => {
      console.log(error);
      console.log('Erreur delete!');
    });
  }

 UpdateComment(c: Commentaire){
    const ref = this.modalService.open(UpdateCommentComponent, {
      centered: true, size: 'sm', scrollable: true
    });
    ref.componentInstance.selectedCommentaire = c;

    ref.result.then((yes) => {
        console.log('Yes Click');

        this.getComment();
      },
      (cancel) => {
        console.log('Cancel Click');

      });
  }
  public getRating(){
    this.serviceRating.getRatingByArticle(this.articleid).subscribe(
      (response: Rating[]) => {
        this.rating = response;
        console.log(this.rating);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public likes(i: number){
    this.rating[i].likes += 1;
  }
}
