import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from './../shared/api.service';
import { MEquipement } from './../Model/equipement';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddEditEquipementComponent } from './../add-edit-equipement/add-edit-equipement.component';

@Component({
  selector: 'app-list-add-edit-equipement',
  templateUrl: './list-add-edit-equipement.component.html',
  styleUrls: ['./list-add-edit-equipement.component.css']
})
export class ListAddEditEquipementComponent implements OnInit {

  mequipement: MEquipement[] = [];
  _url:string;
  searchword:string;
  wordlist = [
    { "code": 'PU', "libelle": "Plus Utilisé"},
    { "code": 'MU', "libelle": "Moins Utilisé"},
    { "code": 'PC', "libelle": "Plus Commandé"},
    { "code": 'Q', "libelle": "Quantité"},
    { "code": 'MQ', "libelle": "Moins Quantité"},
  ];
  selectedWord:string;

  constructor(
    public dialog: MatDialog,
    private apiservice: ApiService,
    private snackbar: MatSnackBar,
    ) {
      this._url = this.apiservice.ApiURL+'images/equipement/';
    }

  openDialog(data: MEquipement) {
    const dialogRef = this.dialog.open(AddEditEquipementComponent, {
      "width": "60%",
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if("reload"===result)
        this.loadEquipement();
    });
  }

  ngOnInit(): void {
    this.loadEquipement();
  }

  loadEquipement(){
    this.apiservice.getRequest('equipement/getall')
      .subscribe( result => {
        if(result.STATUS === "OK"){
          this.mequipement = result.DATA;
        }
        else{
          this.snackbar.open("Error","OK", {duration:2000});
          console.log(result.MESSAGE);
        }

      }, err => console.log(err)
      );
  }

  doAdd(){
    this.openDialog(new MEquipement())
  }

  doEdit(e:MEquipement){
    let eq:MEquipement = new MEquipement();
    eq.cequipement = e.cequipement;
    eq.date = e.date;
    eq.description = e.description;
    eq.imageurl = e.imageurl;
    eq.libequipement = e.libequipement;
    eq.quantite = e.quantite;
    this.openDialog(eq);

  }

  doDelete(e:MEquipement){
    let snackBarRef = this.snackbar.open("Confirmation","Supprimer!", {duration:4000});

    snackBarRef.onAction().subscribe(() => {
      this.apiservice.getRequest('equipement/deleteby/'+e.cequipement)
        .subscribe(result => {
          if(result.STATUS==="OK"){
            this.snackbar.open("Supprimé.","OK", {duration:2000});
            this.mequipement = this.mequipement.filter(eq=>eq !== e);
          }else if(result.STATUS==="NOTOK")
            this.snackbar.open("Equipement utilisé.","OK", {duration:2000});
          else{
            this.snackbar.open("Error","OK", {duration:2000});
            console.log(result.MESSAGE);
          }
        }, err => console.log(err)

        );
    });

  }

  doFilter(word){
    if(this.selectedWord === word.code){
      this.selectedWord = '';
      this.loadEquipement();
    }else
    {
      this.selectedWord = word.code;
      this.loadEquipementby(word.code);
    }
  }

  loadEquipementby(word:string){
    this.apiservice.getRequest('equipement/filterby/'+word)
      .subscribe( result => {
        if(result.STATUS === "OK"){
          this.mequipement = result.DATA;
        }
        else{
          this.snackbar.open("Error","OK", {duration:2000});
          console.log(result.MESSAGE);
        }

      }, err => console.log(err)
      );
  }

  doSearch(){
    this.selectedWord = '';
    if(this.searchword.trim() === "")
      this.loadEquipement();
    else
      this.searchEquipement();
  }

  searchEquipement(){
    this.apiservice.getRequest('equipement/search/'+this.searchword)
      .subscribe( result => {
        if(result.STATUS === "OK"){
          this.mequipement = result.DATA;
        }
        else{
          this.snackbar.open("Error","OK", {duration:2000});
          console.log(result.MESSAGE);
        }

      }, err => console.log(err)
      );
  }

}
