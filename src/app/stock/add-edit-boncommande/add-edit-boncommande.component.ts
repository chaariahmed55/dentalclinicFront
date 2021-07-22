import { BCBody } from './../Model/BCBody';
import { Observable } from 'rxjs';
import { MEquipement } from './../Model/equipement';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MBonCommandeDetail } from './../Model/boncommandedetail';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from './../shared/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MBoncommande } from './../Model/boncommande';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { FormControl } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-edit-boncommande',
  templateUrl: './add-edit-boncommande.component.html',
  styleUrls: ['./add-edit-boncommande.component.css']
})
export class AddEditBoncommandeComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;

  mboncommandedetail: MBonCommandeDetail[] = [];
  mboncommande: MBoncommande = new MBoncommande();
  displayedColumns: string[] = ['cequipement', 'libequipement', 'quantite', 'prix', 'action'];
  dataSource = new MatTableDataSource<MBonCommandeDetail>(this.mboncommandedetail);
  myControl = new FormControl();
  options: MEquipement[] = [];
  filteredOptions: Observable<MEquipement[]>;
  bcbody: BCBody=new BCBody();
  bcDate: Date = new Date();

  constructor(
    public dialog: MatDialog,
    private apiservice: ApiService,
    private snackbar: MatSnackBar,
    private _adapter: DateAdapter<any>,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.mboncommande.dateboncommande = this.datepipe.transform(this.bcDate, 'dd/MM/yyyy', '+1');
    this._adapter.setLocale('fr-FR');
    this.mboncommandedetail.unshift({ cequipement:"", nboncommande: -1,libequipement:"",ordre:-1,prix:0,quantite:0 })
    //this.dataSource = new MatTableDataSource<MBonCommandeDetail>(this.mboncommandedetail.sort((a, b)=> a < b ? 1 : a > b ? -1 : 0));
    this.loadEquipement();
    console.log(this.mboncommande);
  }

  dateChange(){

    if(!this.bcDate){
      this.bcDate = new Date();
    }

    this.mboncommande.dateboncommande = this.datepipe.transform(this.bcDate, 'dd/MM/yyyy', '+1');

    console.log(this.mboncommande);
  }

  ngAfterViewInit(): void {
    this.table.renderRows();
  }

  loadEquipement(){
    this.apiservice.getRequest('equipement/getall')
      .subscribe( result => {
        if(result.STATUS === "OK"){
          this.options = result.DATA;
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
          );
        }
        else{
          this.snackbar.open("Error","OK", {duration:2000});
          console.log(result.MESSAGE);
        }

      }, err => console.log(err)
      );
  }

  doChoose(bond: MBonCommandeDetail){

    let fbond = this.options.find(x=>x.cequipement===bond.cequipement);

    if(fbond)
      bond.libequipement = fbond.libequipement;
    else
      bond.libequipement='';
  }

  private _filter(value: string): MEquipement[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.cequipement.toLowerCase().includes(filterValue));
  }

  doAdd(bond: MBonCommandeDetail){

    let nbond = new MBonCommandeDetail()
    nbond.cequipement = bond.cequipement;
    nbond.libequipement = bond.libequipement;
    nbond.nboncommande = bond.nboncommande;
    nbond.ordre = this.mboncommandedetail.length;
    nbond.prix = bond.prix;
    nbond.quantite = bond.quantite;

    this.mboncommandedetail.push(nbond);

    this.table.renderRows();

    bond.cequipement = '';
    bond.libequipement = '';
    bond.prix = 0;
    bond.quantite = 0;

  }

  doDelete(bond: MBonCommandeDetail){

    console.log(this.mboncommandedetail);

    this.dataSource.data = this.mboncommandedetail.filter(x=>x!==bond);
    this.mboncommandedetail = this.dataSource.data;

    this.table.renderRows();
    console.log(this.mboncommandedetail);

  }

  doSave(){
    this.mboncommande.montant = this.mboncommandedetail.reduce((a,{prix})=> a + prix,0);
    this.mboncommande.nboncommande = -1;

    this.bcbody.entete = this.mboncommande;
    this.bcbody.detail = this.mboncommandedetail.filter(x=>x.ordre !== -1);

    this.apiservice.postRequest(this.bcbody, 'boncommande/new')
      .subscribe( result => {
        if(result.STATUS === "OK"){
          this.snackbar.open("Bon de Commande Enregistré.","OK", {duration:2000});
          this.mboncommande=new MBoncommande();
          this.mboncommandedetail = this.mboncommandedetail.filter(x=>x.ordre === -1);
          this.dataSource.data = this.mboncommandedetail.filter(x=>x.ordre === -1);
          this.table.renderRows();
        }else{
          this.snackbar.open("Error","OK", {duration:2000});
          console.log(result.MESSAGE);
        }
      }, err => console.log(err)
      );
  }

  doValidate(){
    this.mboncommande.etat = "VALIDER";
    this.doSave();
  }

}
