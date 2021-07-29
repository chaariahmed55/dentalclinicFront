import { BCLineChart } from './../Model/BCLineChart';
import { RangeHead } from './../Model/RangeHead';
import { ShowBoncommandeComponent } from './../show-boncommande/show-boncommande.component';
import { PDFService } from './../shared/pdf.service';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from './../shared/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MBoncommande } from './../Model/boncommande';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { ChartType, ChartOptions, ChartDataSets, ChartData, Chart, Easing } from 'chart.js';
import { SingleDataSet, Label , Color, BaseChartDirective } from 'ng2-charts';

const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

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
  @ViewChild(MatTable) table: MatTable<any>;

  //#region dougChart
  @ViewChild('daugchart', { static: true }) daugchart: BaseChartDirective;
  doughnutChartLabels: Label[] = ['EN ATTENTE', 'VALIDER', 'ANNULER'];
  doughnutChartData: SingleDataSet = [0, 0, 0];
  doughnutChartType: ChartType = 'doughnut';

  chartOptions : ChartOptions= {
    responsive:true,
    legend: {position:'right'},
    aspectRatio:1,
  }

  chartColors: Color[]= [{
    backgroundColor:      ['rgba(255, 206, 86, 0.2)','rgba(105, 240, 174, 0.2)','rgba(255, 99, 132, 0.2)'],
    borderColor:          ['rgba(255, 206, 86, 1)', 'rgba(105, 240, 174, 1)', 'rgba(255, 99, 132, 1)'],
    hoverBackgroundColor: ['rgba(255, 206, 86, 1)', 'rgba(105, 240, 174, 1)', 'rgba(255, 99, 132, 1)'],
    hoverBorderColor:     ['rgba(255, 206, 86, 1)', 'rgba(105, 240, 174, 1)', 'rgba(255, 99, 132, 1)']
  }];
  //#endregion

  //#region lineChart
  @ViewChild('linechart', { static: true }) chart: BaseChartDirective;
  lineChartData: ChartDataSets[] = [{ data: [0], label: 'Bon de Commande' }];
  lineChartLabels: Label[] = ['Janvier'];
  lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes:[{
        ticks: {beginAtZero: true}
      }]
    }
  };
  lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      pointBackgroundColor: 'rgba(75, 192, 192, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(75, 192, 192, 0.8)'
    },];
    lineChartLegend = true;
    lineChartType: ChartType = 'line';
  //#endregion

  constructor(
    public dialog: MatDialog,
    private apiservice: ApiService,
    private snackbar: MatSnackBar,
    public paglabel: MatPaginatorIntl,
    private _adapter: DateAdapter<any>,
    private titleService:Title,
    public datepipe: DatePipe,
    private pdfservice:PDFService,
  ) {

  }

  ngOnInit(): void {
    this.loadLineChart();
    this.titleService.setTitle('Bon Commande');
    this.dateDebut.setDate(this.dateDebut.getDate() - 7);

    this._adapter.setLocale('fr');
    this.paginatorhandler();
    this.loadBoncommande();
  }

  ngAfterViewInit(): void {

  }

  loadBoncommande(){
    let dd = this.datepipe.transform(this.dateDebut, 'yyyy-MM-dd', '+1');
    let df = this.datepipe.transform(this.dateFin, 'yyyy-MM-dd', '+1');
    this.apiservice.getRequest('boncommande/range/'+dd+'/'+df)
    .subscribe( result => {
      if(result.STATUS === "OK"){

        if(result.DATA){
          let head: RangeHead[] = [];

          this.mboncommande = result.DATA.body;
          this.dataSource.data = result.DATA.body;
          this.table.renderRows();
          this.dataSource.paginator = this.paginator;
          //this.dataSource.sort = this.sort;

          this.doughnutChartData = [];

          head = result.DATA.head;
          let hd : RangeHead = new RangeHead();
          hd = head.find(x=>x.etat==="EN ATTENTE");
          this.doughnutChartData.push(( hd ? hd.count : 0 ));
          hd = head.find(x=>x.etat==="VALIDER");
          this.doughnutChartData.push(( hd ? hd.count : 0 ));
          hd = head.find(x=>x.etat==="ANNULER");
          this.doughnutChartData.push(( hd ? hd.count : 0 ));
          this.daugchart.update();
        }

      }
      else{
        this.snackbar.open("Error","OK", {duration:2000});
        console.log(result.MESSAGE);
      }

    }, err => console.log(err)
    );
  }

  doDateChange(){
    this.loadBoncommande();
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

  doAnnuler(mb:MBoncommande){
    let snackBarRef = this.snackbar.open("Confirmation","Annuler!", {duration:4000});

    snackBarRef.onAction().subscribe(() => {
      this.apiservice.getRequest('boncommande/annuler/'+mb.nboncommande)
        .subscribe( result => {
          if(result.STATUS === "OK"){
            this.snackbar.open("Bon de Commande Annulé.","OK", {duration:2000});
            this.dataSource.data = this.dataSource.data.filter(x=>x.nboncommande !== mb.nboncommande);
            this.table.renderRows();
            this.loadBoncommande();
          }else{
            this.snackbar.open("Error","OK", {duration:2000});
            console.log(result.MESSAGE);
          }
        }, err => console.log(err)
        );
    });
  }

  doPrint(mb: MBoncommande){
    this.pdfservice.doPrint(mb);
  }

  doShow(data: MBoncommande) {
    const dialogRef = this.dialog.open(ShowBoncommandeComponent, {
      "width": "60%",
      data: data
    });
  }

  doSort(sort: Sort){

    if (!sort.active || sort.direction === '') {
      this.dataSource.data = this.dataSource.data.sort((a, b)=>  this.compare(a.nboncommande, b.nboncommande, false));
      return;
    }

    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nboncommande': return this.compare(a.nboncommande, b.nboncommande, isAsc);
        case 'dateboncommande':
          let ad = a.dateboncommande.split('/');
          let bd = b.dateboncommande.split('/');
          return this.compare(new Date(+ad[2], +ad[1]-1 , +ad[0]), new Date(+bd[2], +bd[1]-1 , +bd[0]), isAsc);
        case 'montant': return this.compare(a.montant, b.montant, isAsc);
        case 'etat': return this.compare(a.etat, b.etat, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  loadLineChart(){
    let currentmonth = new Date().getMonth();
    this.lineChartLabels = [];
    this.lineChartData[0].data = [];
    monthNames.forEach((val, x)=>{
      if(x>currentmonth) return;
      this.lineChartLabels.push(val);
      this.lineChartData[0].data.push(0);
    });
    this.apiservice.getRequest('boncommande/linechart')
    .subscribe( result => {
      console.log(result);

      if(result.STATUS === "OK"){

         if(result.DATA){
           let llinechart: BCLineChart[] = result.DATA;
              llinechart.forEach((v, x)=>{
                if(v.mn<=(currentmonth+1)){
                  this.lineChartData[0].data[(v.mn-1)] = v.sum;
                  console.log(v);
                }
              });
            console.log(this.chart);

            this.chart.update();
         }
      }
      else{
        console.log(result.MESSAGE);
      }

    }, err => console.log(err)
    );
  }

}
