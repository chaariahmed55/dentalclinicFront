import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../shared/api.service';
import { MEquipement } from './../Model/equipement';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-equipement',
  templateUrl: './add-edit-equipement.component.html',
  styleUrls: ['./add-edit-equipement.component.css']
})
export class AddEditEquipementComponent implements OnInit {

  title="Nouvel Equipement";
  equipement: MEquipement = new MEquipement();
  _url:string;
  localImage:boolean = false;

  //#region formControl

  codeForm= new FormControl('', [Validators.required]);
  LibForm= new FormControl('', [Validators.required]);
  QteForm= new FormControl('', [Validators.required]);

  //#endregion

  constructor(
      public dialogRef: MatDialogRef<AddEditEquipementComponent>,
      @Inject(MAT_DIALOG_DATA) public data: MEquipement,
      private apiservice: ApiService,
      private snackbar: MatSnackBar
      ) {
        this.equipement = data;
        if(this.equipement.imageurl){
          this._url = this.apiservice.ApiURL+'images/equipement/';
          this.title="Modifier l'équipement";
        }
      }

  ngOnInit(): void {
  }

  doclick() {
    document.getElementById("imageinput").click();
  }

  getimage(image: any) {
    this.localImage = true;
    var reader = new FileReader();
    reader.readAsDataURL(image.target.files[0]);
    reader.onload = (_event) => {
      this.equipement.imageurl = reader.result.toString();
    };
  }

  doSave(){
    if(!this.formCheck()) return;
    this.apiservice.postRequest(this.equipement, 'equipement/save')
      .subscribe( result => {
        if(result.STATUS === "OK"){
          this.snackbar.open("Equipement Enregistré.","OK", {duration:2000});
          this.dialogRef.close('reload');
        }else{
          this.snackbar.open("Error","OK", {duration:2000});
          console.log(result.MESSAGE);
        }
      }, err => console.log(err)
      );
  }

  qteChange(){
    console.log(this.equipement.quantite);

    if(this.equipement.quantite<0)
      this.equipement.quantite=0
  }

  formCheck(){
    this.codeForm.markAsTouched();
    this.LibForm.markAsTouched();
    if(this.equipement.quantite<0)
      this.equipement.quantite=0;

    return this.equipement.cequipement && this.equipement.libequipement && this.equipement.quantite>=0;
  }

}
