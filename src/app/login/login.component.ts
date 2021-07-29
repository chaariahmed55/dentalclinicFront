import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login;
  password;

  constructor(private loginservice:LoginService,private router:Router,private activateRoute:ActivatedRoute, private http : HttpClient) { }
  ngOnInit(): void {
  }

  ajoutpatient(){
    // console.log('1',this.patient);
    // this.patient.telephone=this.patient.telephone;
    this.loginservice.login(this.login,this.password);
    
  }

}
