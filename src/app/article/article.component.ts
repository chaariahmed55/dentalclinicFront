import {Component, OnInit, ViewChild} from '@angular/core';
import {Article} from '../entity/Article';
import {HttpErrorResponse} from '@angular/common/http';
import {ArticleService} from '../service/article.service';
import {MatDialog, MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import {AddArticleComponent} from './add-article/add-article.component';
import {MatTableDataSource} from '@angular/material/table';
import {BehaviorSubject} from 'rxjs';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UpdateArticleComponent} from './update-article/update-article.component';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  public article: Article[];
  searchText;
  closeResult: string;
  deleteId: number;
  listData: MatTableDataSource<any>;
  refreshlist = new BehaviorSubject<boolean>(true);
  p = 1;
  url: string;


  constructor(private serviceArticle: ArticleService, private  dialogRef: MatDialog, private modalService: NgbModal,
              private snackbar: MatSnackBar) {
    this.serviceArticle.listen().subscribe((m: any) => {
      console.log(m);
      this.ArticleList();
    });
  }

  ngOnInit(): void {
    this.ArticleList();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '350px';
    dialogConfig.width = '600px';
    this.dialogRef.open(AddArticleComponent, dialogConfig);
  }

  editArticle(a: Article) {

    const ref = this.modalService.open(UpdateArticleComponent, {
      centered: true, size: 'lg', scrollable: true,
    });
    ref.componentInstance.selectedArticle = a;

    ref.result.then((yes) => {
        console.log('Yes Click');

        this.ArticleList();
      },
      (cancel) => {
        console.log('Cancel Click');

      });
  }

  ArticleList() {
    this.serviceArticle.getAllArticle().subscribe(
      (response: Article[]) => {
        this.article = response;
        console.log(this.article);
        console.log('hellooooo');
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  doDelete(a: Article) {
    const snackBarRef = this.snackbar.open('Confirmation', 'Supprimer!', {duration: 4000});

    snackBarRef.onAction().subscribe(() => {
      this.serviceArticle.deleteArticle(a.id)
        .subscribe(result => {
          this.snackbar.open('Supprimé.', 'OK', {duration: 2000});
          this.ArticleList();
        });
    });
  }

  /*searchFilter() {
    this.serviceArticle.searchbyTitle().subscribe((response: Article[]) => {
      this.article = response;
      console.log(response);
      this.serviceArticle.filter('title');

    });
  }*/

  searchFilter() {
  this.serviceArticle.getArticleById(this.searchText).subscribe();
}
/*
      enableDisableRule(job) {
        this.toggle = !this.toggle;
        this.status = this.toggle ? 'Enable' : 'Disable';
      }
    */
}
