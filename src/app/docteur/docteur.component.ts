import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../entity/user';
import { PatientService } from '../service/patient.service';

@Component({
  selector: 'app-docteur',
  templateUrl: './docteur.component.html',
  styleUrls: ['./docteur.component.css']
})
export class DocteurComponent implements OnInit {
  @ViewChild("closebutton")closebutton;
  docteur:User;
  updatevalue=true;
  
  today = new Date();
  date=this.today.getDate()+" "+this.today.toString().substr(4,3)+". "+this.today.getFullYear();
  constructor(private patientservice:PatientService,private router:Router,private activateRoute:ActivatedRoute, private http : HttpClient) { }

  ngOnInit(): void {
    this.Afficherdocteur();
  }

  Afficherdocteur()
  {
    this.patientservice.getonedocteur().subscribe(data=> {
        this.docteur = data[0]
        })
  }

update(): void {
  this.patientservice.updateuser(this.docteur)
  this.closebutton.nativeElement.click();
}

}
