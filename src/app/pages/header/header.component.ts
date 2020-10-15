import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isCollapsed:boolean

  constructor(public service: LoginService) { 
    this.isCollapsed = true
  }

  ngOnInit(): void {
  }

  colapsar(){
    this.isCollapsed = false
  }

}

