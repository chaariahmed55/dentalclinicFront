import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../entity/role';
import { RoleService } from '../service/role.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  allrole:Role[];
  constructor(private roleservice:RoleService,private router:Router,private activateRoute:ActivatedRoute, private http : HttpClient) { }

  ngOnInit(): void {
    this.AfficherRole();
  }


  AfficherRole()
  {
    this.roleservice.getallrole().subscribe(data=>{
    this.allrole=data;
  })

 
}






}
