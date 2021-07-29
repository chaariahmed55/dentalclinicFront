import { HttpClient } from '@angular/common/http';
import { Component,AfterViewInit,ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../entity/user';
import { PatientService } from '../service/patient.service';
;

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})

export class PatientComponent implements OnInit {
  @ViewChild("closebutton")closebutton;
  allpatient:User[]=[];
  patient=new User();
  pa=new User();
  updatevalue=true;
  champrecherche="";
  pageactuelle=0;
  maxpage=0;

  constructor(private patientservice:PatientService,private router:Router,private activateRoute:ActivatedRoute, private http : HttpClient) { }

  ngOnInit(): void {
    this.Afficheruser(this.pageactuelle);
    this.patientservice.getallpages().subscribe(data=> {
      console.log(data[0]['1']);
      this.maxpage= Math.floor(data[0]['1']/6);
      console.log(this.maxpage)
      })
  }
  Afficheruser(param)
  {
    this.patientservice.getalluser(param).subscribe(data=>{
      for (var val of data) {
        if (val.role.role=="Patient"){
          this.allpatient.push(val);
        }
      }
    })
  }

  ajoutpatient(){
    console.log('1',this.patient);
    // this.patient.telephone=this.patient.telephone;
    this.patientservice.adduser(this.patient)
    this.closebutton.nativeElement.click();
    location.reload();
  }
  
  delete(param){
    console.log("heloooooooooooo");
    console.log(1,param)
    this.patientservice.deleteuser(param)
    location.reload();
  }

  showcurrentpatient(param){
    console.log(param);
    this.patient=param;
  }

  update(): void {
    this.patientservice.updateuser(this.pa)
    this.closebutton.nativeElement.click();
    location.reload();
  }



recherchepatient(param){
  if (param=="") {
    this.allpatient=[];
    console.log("le champ est vide ");
    this.Afficheruser(this.pageactuelle);
  }else{
    this.allpatient=[];
    this.patientservice.recherche(param).subscribe(data=>{
      for (var val of data) {
        if (val.role.role=="Patient"){
          this.allpatient.push(val);
        }
      }
      console.log(this.allpatient);
    });
  }
}

next(){
  this.pageactuelle+=1;
  this.allpatient=[];
  this.Afficheruser(this.pageactuelle);
}
previous(){
  this.pageactuelle-=1;
  this.allpatient=[];
  this.Afficheruser(this.pageactuelle);
}


loadpatient(){
  this.patientservice.fexture();
}



}





 