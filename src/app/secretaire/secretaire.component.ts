import { HttpClient } from '@angular/common/http';
import { Component, OnInit ,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../entity/user';
import { PatientService } from '../service/patient.service';

@Component({
  selector: 'app-secretaire',
  templateUrl: './secretaire.component.html',
  styleUrls: ['./secretaire.component.css']
})
export class SecretaireComponent implements OnInit {
  @ViewChild("closebutton")closebutton;
  secretaire:User;
  today = new Date();
  updatevalue=true;
  date=this.today.getDate()+" "+this.today.toString().substr(4,3)+". "+this.today.getFullYear();


  constructor(private patientservice:PatientService,private router:Router,private activateRoute:ActivatedRoute, private http : HttpClient) { }

  ngOnInit(): void {
    this.Affichersecretaire();
  }

  Affichersecretaire()
  {
    this.patientservice.getonesecretaire().subscribe(data=> {
      this.secretaire = data[0]
    
      })
  }

  update(): void {
    this.patientservice.updateuser(this.secretaire)
    this.closebutton.nativeElement.click();
  }


}
