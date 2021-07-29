import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
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
import { FormControl, Validators } from '@angular/forms';
import {map, startWith, filter} from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';

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
  nb:number;
  _updateBC:boolean=false;

  //#region formControl

  dateform = new FormControl('', [ Validators.required ]);
  codefform = new FormControl('', [ Validators.required ]);
  raisfform = new FormControl('', [ Validators.required ]);

  //#endregion

  constructor(
    public dialog: MatDialog,
    private apiservice: ApiService,
    private snackbar: MatSnackBar,
    private _adapter: DateAdapter<any>,
    public datepipe: DatePipe,
    private titleService:Title,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle( (this._updateBC ? this.nb + ' | Éditer' : 'Nouveau' )+' Bon de Commande');

    this.getParams();
    this.mboncommande.dateboncommande = this.datepipe.transform(this.bcDate, 'dd/MM/yyyy', '+1');
    this._adapter.setLocale('fr-FR');
    this.mboncommandedetail.unshift({ cequipement:"", nboncommande: -1,libequipement:"",ordre:-1,prix:0,quantite:0 })
    //this.dataSource = new MatTableDataSource<MBonCommandeDetail>(this.mboncommandedetail.sort((a, b)=> a < b ? 1 : a > b ? -1 : 0));
    this.loadEquipement();
  }

  getParams(){
    if(this.route.snapshot.params.nb){
      this.nb = this.route.snapshot.params.nb;
      //this.mboncommande.nboncommande = this.nb;
      this.getBonCommande();
    }

    // if(this.route.snapshot.params.nb){

    //   this.router.events.pipe(
    //     filter(e => e instanceof NavigationStart)).subscribe(e => {
    //       const navigation = this.router.getCurrentNavigation();
    //       console.log("state : ", navigation.extras.state);

    //       if(navigation.extras.state instanceof MBoncommande){
    //         this.updateBC = true;

    //         console.log("state M : ", navigation.extras.state);
    //       }
    //   });
    // }
  }

  getBonCommande(){
    this.apiservice.getRequest('boncommande/fetchby/'+this.nb)
    .subscribe( result => {
      if(result.STATUS === "OK"){

        if(result.DATA){
          this._updateBC = true;
          this.titleService.setTitle( (this._updateBC ? this.nb + ' | Éditer' : 'Nouveau' )+' Bon de Commande');

          this.bcbody = result.DATA;
          this.mboncommande = this.bcbody.entete;

          if(this.mboncommande.etat === "ANNULER"){
            this.router.navigateByUrl('/back/boncommandeedit');
            return;
          }
          let dd = this.mboncommande.dateboncommande.split('/');
          this.bcDate = new Date(+dd[2], +dd[1]-1 , +dd[0]);

          if(this.mboncommande.bvalid){
            this.mboncommandedetail = this.bcbody.detail;
            this.dataSource.data =this.bcbody.detail;
          }else{
            this.mboncommandedetail = this.mboncommandedetail.concat(this.bcbody.detail);
            this.dataSource.data =  this.dataSource.data.concat(this.bcbody.detail)
          }
          this.table.renderRows();
        }
      }
      else{
        this.snackbar.open("Error","OK", {duration:2000});
        console.log(result.MESSAGE);
      }

    }, err => console.log(err)
    );
  }

  dateChange(){
    if(!this.bcDate){
      this.bcDate = new Date();
    }
    this.mboncommande.dateboncommande = this.datepipe.transform(this.bcDate, 'dd/MM/yyyy', '+1');
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
    this.mboncommande.montant = this.mboncommandedetail.reduce((a, c)=> a + c.prix, 0);

  }

  doDelete(bond: MBonCommandeDetail){
    if(this.mboncommande.bvalid) return;
    this.dataSource.data = this.mboncommandedetail.filter(x=>x!==bond);
    this.mboncommandedetail = this.dataSource.data;

    this.table.renderRows();

    this.mboncommande.montant = this.mboncommandedetail.reduce((a, c)=> a + c.prix, 0);

  }

  formCheck(){
    this.dateform.markAsTouched();
    this.codefform.markAsTouched();
    this.raisfform.markAsTouched();
    if(this.mboncommandedetail.length<=1)
      this.snackbar.open("Detail Requise.","OK", {duration:2000});

    return this.mboncommandedetail.length>1 && this.mboncommande.dateboncommande && this.mboncommande.cfournisseur && this.mboncommande.raisonsocialefournisseur;
  }

  doSave(){
    if(!this.formCheck()) return;
    this.mboncommande.montant = this.mboncommandedetail.reduce((a, c)=> a + c.prix, 0);

    this.bcbody.entete = this.mboncommande;
    this.bcbody.detail = this.mboncommandedetail.filter(x=>x.ordre !== -1);

    this.apiservice.postRequest(this.bcbody, 'boncommande/save')
      .subscribe( result => {
        if(result.STATUS === "OK"){
          this.snackbar.open("Bon de Commande Enregistré.","OK", {duration:2000});
          if(!this._updateBC)
            this.reset();
          else{
            //this.mboncommandedetail.shift();
            if(this.mboncommande.bvalid){
              this.dataSource.data.shift();
              this.table.renderRows();
            }
          }
        }else{
          this.snackbar.open("Error","OK", {duration:2000});
          this.mboncommande.etat = "EN ATTENTE";
          this.mboncommande.bvalid = false;
          console.log(result.MESSAGE);
        }
      }, err => {
        console.log(err);
        this.mboncommande.etat = "EN ATTENTE";
        this.mboncommande.bvalid = false;
      }
      );
  }

  doValidate(){
    if(!this.formCheck()) return;
    this.mboncommande.etat = "VALIDER";
    this.mboncommande.bvalid = true;
    this.doSave();
  }

  doAnnuler(){
    this.apiservice.getRequest('boncommande/annuler/'+this.nb)
      .subscribe( result => {
        if(result.STATUS === "OK"){
          this.snackbar.open("Bon de Commande Enregistré.","OK", {duration:2000});
          this.router.navigateByUrl('/back/boncommandeedit');
        }else{
          this.snackbar.open("Error","OK", {duration:2000});
          console.log(result.MESSAGE);
        }
      }, err => console.log(err)
      );
  }

  reset(){
    this.mboncommande=new MBoncommande();
    this.mboncommandedetail = this.mboncommandedetail.filter(x=>x.ordre === -1);
    this.dataSource.data = this.mboncommandedetail.filter(x=>x.ordre === -1);
    this.table.renderRows();
    this.dateform.markAsUntouched();
    this.codefform.markAsUntouched();
    this.raisfform.markAsUntouched();
  }

  prixChange(mbd: MBonCommandeDetail){
    if(mbd.ordre>0){
      this.mboncommande.montant = this.mboncommandedetail.reduce((a, c)=> a + c.prix, 0);
    }
  }
}
