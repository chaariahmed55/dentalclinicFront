import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {Commentaire} from '../../entity/Commentaire';
import {CommentaireService} from '../../service/commentaire.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-update-comment',
  templateUrl: './update-comment.component.html',
  styleUrls: ['./update-comment.component.css']
})
export class UpdateCommentComponent implements OnInit {

  // attributes
  comment = new Commentaire();

  selectedCommentaire: Commentaire;
  editForm: FormGroup;
  isLoading = false;
  articleid: number;

  constructor(public modal: NgbActiveModal, private route: ActivatedRoute,
              private commentservice: CommentaireService, private formBuilder: FormBuilder, private router: Router){
  }

  ngOnInit() {
    this.setForm();
  }
  onSubmit() {
     if (this.editForm.invalid || this.isLoading) {
       return;
     }
     this.isLoading = true;
     const date = new Date();
     const d = date.getUTCDate();
     const day = (d < 10) ? '0' + d : d;
     const m = date.getUTCMonth() + 1;
     const month = (m < 10) ? '0' + m : m;
     const year = date.getUTCFullYear();
     const loctime = `${year}-${month}-${day}`;
     this.comment.date = loctime;
     this.editForm.controls[`article`].setValue(this.selectedCommentaire.article.id);
     this.commentservice.updateCommentaire(this.editForm.value).subscribe(x => {
         this.isLoading = false;
         this.modal.close('Yes');
       },
       error => {
         this.isLoading = false;
       });
   }

   get editFormData() {
     return this.editForm.controls;
   }

   private setForm() {
     console.log(this.selectedCommentaire);

     this.editForm = this.formBuilder.group({
       id: [this.selectedCommentaire.id],
       comment: [this.selectedCommentaire.comment, [Validators.required, Validators.minLength(4)]],
       date: [this.selectedCommentaire.date, new Date()],
       article: [this.selectedCommentaire.article]
     });
   }
  }

