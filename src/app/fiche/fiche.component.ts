import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Fiche } from '../entity/fiche';
import { Intervention } from '../entity/intervention';
import { Medicament } from '../entity/medicament';
import { User } from '../entity/user';
import { FicheService } from '../service/fiche.service';
import { InterventionService } from '../service/intervention.service';
import { MedicamentService } from '../service/medicament.service';
import { PatientService } from '../service/patient.service';


@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.css']
})
export class FicheComponent implements OnInit {
  valuesearch : string = "";
  @ViewChild("closebutton")closebutton;
  private patientid;
  patient=new User;
  fiches:Fiche[];
  i=0;

  fiche=new Fiche;
  ficheshow=new Fiche;

  medicament=new Medicament;
  medicamentshow=new Medicament;

  intervention=new Intervention;
  interventionshow=new Intervention;

  champrecherche="";
  pageactuelle=0;
  maxpage=0;



  constructor(private medicamentservice:MedicamentService,private interventionservice:InterventionService,private ficheservice:FicheService,private patientservice:PatientService,private req: ActivatedRoute,private router:Router,private activateRoute:ActivatedRoute, private http : HttpClient) { }

  ngOnInit(){
    this.patientid = this.req.snapshot.params['patientid'];
    this.getonuser(this.patientid);
    this.getallfichebyuser(this.patientid,this.pageactuelle);

    this.ficheservice.getallpages(this.patientid).subscribe(data=> {
      console.log(data[0]['1']);
      this.maxpage= Math.floor(data[0]['1']/5);
      console.log(this.maxpage)
      })




  }

getonuser(param){
  this.patientservice.getonuser(param).subscribe(data=>{
    this.patient=data;
    // console.log(this.patient);
      })
}

getallfichebyuser(param1,param2){
  this.ficheservice.getfichebyuser(param1,param2).subscribe(data=>{
    this.fiches=data;
      })
}

async ajoutfiche(){
  this.addfiche();
  setTimeout(()=> {
    this.addcomposantfiche();
    setTimeout(()=>{this.generatepdf();  this.closebutton.nativeElement.click();
;    },5000)
  }, 10000)
  // setTimeout(()=> {
  //   this.generatepdf()
  // }, 8000)
  // setTimeout(()=> {
  //   this.closebutton.nativeElement.click();
  //   location.reload();
  // }, 10000)
}

// ajoutfiche1(){
//   this.addcomposantfiche();
// }

addfiche(){
  let patienttoadd =this.patientservice.getonuser(this.patientid.toString());
  patienttoadd.subscribe((data)=>{console.log(data.id);
  this.fiche.user=data.id;
  this.ficheservice.addfiche(this.fiche);
  }
  ); 
}
addcomposantfiche(){
  this.fiche=new Fiche();
  this.getallfichebyuser(this.patientid,this.pageactuelle);
  for (let index of this.fiches) {
    this.i= index.id;
  }
  this.medicament.fiche=this.i+1;
  this.medicamentservice.addmedicament(this.medicament);
  this.intervention.fiche=this.i+1;
  this.interventionservice.addintervention(this.intervention);
  // this.closebutton.nativeElement.click();
  //   location.reload();
}

show(param){
  this.ficheshow=param;
  console.log(this.ficheshow);
  this.medicamentservice.getonemedicament(this.ficheshow.id).subscribe(param=>{
    this.medicamentshow=param
    console.log("show medicament",this.medicamentshow);
  })
  
  this.interventionservice.getoneintervention(this.ficheshow.id).subscribe(param=>{
    this.interventionshow=param
    console.log("show inervention",this.medicamentshow);
  })
}




updatechanges(){
  console.log("test 1",this.ficheshow);
  console.log("test 2",this.medicamentshow);
  console.log("test 3",this.interventionshow);
  
  this.ficheservice.updatefiche(this.ficheshow);
  this.medicamentservice.updatemedicament(this.medicamentshow);
  this.interventionservice.updateintervention(this.interventionshow);
  this.closebutton.nativeElement.click();
    location.reload();
}


recherchefiche(param){
  if (param=="") {
    this.fiches=[];
    console.log("le champ est vide ");
    this.getallfichebyuser(this.patientid,this.pageactuelle);
  }else{
    this.fiches=[];
    this.ficheservice.recherche(this.patientid,this.champrecherche).subscribe(data=>{
      for (var val of data) {
          this.fiches.push(val);
      }
      console.log(this.fiches);
    });
  }
}


next(){
  this.pageactuelle+=1;
  this.fiches=[];
  this.getallfichebyuser(this.patientid,this.pageactuelle);
}
previous(){
  this.pageactuelle-=1;
  this.fiches=[];
  this.getallfichebyuser(this.patientid,this.pageactuelle);
}

generatepdf(){
  console.log("generating");
  var element = document.getElementById('ordonnance');
  html2canvas(element).then((canvas)=>{
    var imgData =canvas.toDataURL('image/png')
    var doc = new jsPDF()
    var imgHeight = canvas.height*208 /canvas.width;
    doc.addImage(imgData,0,0,208,imgHeight)
    doc.save("image.pdf")

  });
}





}
