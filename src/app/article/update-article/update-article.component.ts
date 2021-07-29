import { Component, OnInit } from '@angular/core';
import {Article} from '../../entity/Article';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleService} from '../../service/article.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css']
})
export class UpdateArticleComponent implements OnInit {

  // attributes
  article = new Article();

  selectedArticle: Article;
  articleToUpdate: Article;
  editForm: FormGroup;
  isLoading = false;
  imageB64: string;
  constructor(public modal: NgbActiveModal, private route: ActivatedRoute,
              private articleservice: ArticleService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.setForm();
  }

  onSubmit() {
    if (this.editForm.invalid || this.isLoading) {
      return;
    }
    const payload =  {
      base_64: this.imageB64
    };
    this.articleservice.uploadPhoto(payload).subscribe((res) => {
      console.log((res.imagepath));
      this.selectedArticle.imagepath = res.imagepath;
      this.editForm.controls[`imagepath`].setValue(res.imagepath);
      console.log(this.article);
      this.articleservice.updateArticle(this.editForm.value);
    });
  }



  get editFormData() { return this.editForm.controls; }

  private setForm() {
      this.editForm = this.formBuilder.group({
      id: [this.selectedArticle.id],
      title: [this.selectedArticle.title, [Validators.required, Validators.minLength(4)]],
      description: [this.selectedArticle.description, [Validators.required, Validators.minLength(4)]],
      date: [ this.selectedArticle.date, Validators.required],
      imagepath: [this.selectedArticle.imagepath]
    });
  }
    handleUpload(event){
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imageURL = reader.result ? reader.result.toString() : '';
        this.imageB64 = imageURL.split(',')[1];
        console.log(this.imageB64);
      };
    }
  }

