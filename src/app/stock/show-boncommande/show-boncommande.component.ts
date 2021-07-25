import { MBonCommandeDetail } from './../Model/boncommandedetail';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MBoncommande } from './../Model/boncommande';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-show-boncommande',
  templateUrl: './show-boncommande.component.html',
  styleUrls: ['./show-boncommande.component.css']
})
export class ShowBoncommandeComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;

  mboncommandedetail: MBonCommandeDetail[] = [];
  mboncommande: MBoncommande = new MBoncommande();
  displayedColumns: string[] = ['cequipement', 'libequipement', 'quantite', 'prix', 'action'];
  dataSource = new MatTableDataSource<MBonCommandeDetail>(this.mboncommandedetail);

  constructor(
    public dialogRef: MatDialogRef<ShowBoncommandeComponent>,
      @Inject(MAT_DIALOG_DATA) public data: MBoncommande,
      private apiservice: ApiService,
      private snackbar: MatSnackBar,
  ) {
    this.mboncommande = data;
  }

  ngOnInit(): void {
    this.loadBoncommande();
  }

  loadBoncommande(){
    if(this.mboncommande){
      this.apiservice.getRequest('boncommande/fetchby/')
        .subscribe( result => {
          if(result.STATUS === "OK"){

            if(result.DATA){
              this.dataSource.data = result.DATA;
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
  }

}
