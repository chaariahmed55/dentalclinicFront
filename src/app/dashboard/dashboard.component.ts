import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from 'src/app/service/patient.service';
import { User } from '../entity/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  alluser:User[];
  constructor(private patientservice:PatientService,private router:Router,private activateRoute:ActivatedRoute, private http : HttpClient) { }

  ngOnInit(): void {
  }





}
