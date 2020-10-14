import { Component,ViewChild,TemplateRef, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  public profesor:boolean
  constructor(public service:LoginService) {
    this.profesor = true
   }

  ngOnInit(): void {

  }

  login(){
    this.service.entrar()
  }

  registrarse(){
    this.service.entrar()
 
  }

  cambiar(data:string){
    if(data == 'padres'){
      this.profesor = false  
    }else{
      this.profesor = true
    }
    this.service.navbar(data)
  }

}
