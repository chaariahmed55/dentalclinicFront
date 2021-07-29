import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ArticleService} from '../../service/article.service';
import {Article} from '../../entity/Article';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {error} from '@angular/compiler/src/util';


@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  article = new Article();

  // attributes

  fileToupload: File = null;
  imageB64: string;
  isSuccess = false;

  constructor(private articleService: ArticleService, private router: Router ,  private  dialogRef: MatDialog,
              public dialogbox: MatDialogRef<AddArticleComponent>) {
  }

  // form groupe add Article
  ArticleForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [Validators.required, Validators.minLength(4)]),
    date: new FormControl('', [Validators.required]),
    imagepath: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {

  }
  addArticle() {
    const payload = {
      base_64: this.imageB64
    };
    this.articleService.uploadPhoto(payload).subscribe((res) => {
      console.log((res.imagepath));
      this.article.imagepath = res.imagepath;
      console.log(this.article);
      this.articleService.addArticle(this.article).subscribe((result) => {
        console.log(result);
        this.isSuccess = true;
        this.ArticleForm.reset();
      }, err => {
        console.log(err);
        this.ArticleForm.setValue(error('errooooooor'));
      });

    });
  }

  close(){
    this.dialogbox.close();
    this.articleService.filter('Register Click');
  }

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file); // return string
    reader.onload = () => {
      const imageURL = reader.result ? reader.result.toString() : '';
      this.imageB64 = imageURL.split(',')[1];
      console.log(this.imageB64);
    };
  }
}
