import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from './../shared/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MBoncommande } from './../Model/boncommande';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'app-list-boncommande',
  templateUrl: './list-boncommande.component.html',
  styleUrls: ['./list-boncommande.component.css']
})
export class ListBoncommandeComponent implements OnInit {

  mboncommande: MBoncommande[] = [];
  displayedColumns: string[] = ['nboncommande', 'dateboncommande', 'raisonsocialefournisseur', 'montant', 'etat', 'action'];
  dataSource = new MatTableDataSource<MBoncommande>(this.mboncommande);
  dateDebut:Date = new Date();
  dateFin:Date = new Date();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private apiservice: ApiService,
    private snackbar: MatSnackBar,
    public paglabel: MatPaginatorIntl,
    private _adapter: DateAdapter<any>
  ) {

  }

  ngOnInit(): void {
    this.dateDebut.setDate(this.dateDebut.getDate() - 7);
    console.log(this.dateDebut );

    this._adapter.setLocale('fr');
    this.paginatorhandler();
    this.loadBoncommande();
  }

  ngAfterViewInit(): void {

  }

  loadBoncommande(){
    this.apiservice.getRequest('boncommande/getall')
    .subscribe( result => {
      if(result.STATUS === "OK"){
        this.mboncommande = result.DATA;
        this.mboncommande = this.mboncommande.concat(this.mboncommande);
        this.mboncommande = this.mboncommande.concat(this.mboncommande);
        this.mboncommande = this.mboncommande.concat(this.mboncommande);
        this.mboncommande = this.mboncommande.concat(this.mboncommande);
        this.dataSource = new MatTableDataSource<MBoncommande>(this.mboncommande);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else{
        this.snackbar.open("Error","OK", {duration:2000});
        console.log(result.MESSAGE);
      }

    }, err => console.log(err)
    );
  }

  doAdd(){

  }

  paginatorhandler(){
    this.paglabel.itemsPerPageLabel="Éléments par page :";
    this.paglabel.nextPageLabel = "Page suivante";
    this.paglabel.previousPageLabel = "Page précédente";
    this.paglabel.firstPageLabel = "Première page";
    this.paglabel.lastPageLabel = "Pernière page";

    this.paglabel.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 / ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} / ${length}`;
    };
    this.paglabel.changes.next();
  }
}