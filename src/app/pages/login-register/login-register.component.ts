import { Component,ViewChild,TemplateRef, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
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

  login(data:any){
    let usuario = new User(data.username, data.password)
    this.service.loginPadre(usuario).subscribe((datapadre:any)=>{
      if(datapadre.status == "padreexiste"){
          console.log(datapadre);
          this.service.home(true)
          this.service.navbar('padres')
          this.service.entrar()
      }else{
          console.log("El padre no existe");
          this.service.loginProfesor(usuario).subscribe((dataprofe:any)=>{
            if(dataprofe.status == "profeexiste"){
              console.log(dataprofe);
              this.service.home(false)
              this.service.navbar('profes')
              this.service.entrar()
            }else{
              console.log("El profesor no existe");
            }
          })
      }
    })
  }

  registrarse(data:any){
    if(data.password1 == data.password2){
      if(this.profesor==false){
        let usuario = new User(data.usuario, data.password1, data.correo)
        this.service.postPadre(usuario).subscribe((datapadre:any)=>{
          console.log(datapadre);
          if(datapadre.status != "existe"){
            this.service.entrar()
          }else{
            console.log("El usuario ya existe");
          }
      })
      }else{
        let usuario = new User(data.usuario, data.password1, data.correo)
        this.service.postProfe(usuario).subscribe((dataprofe:any)=>{
          console.log(dataprofe);
          if(dataprofe.status != "existe"){
            this.service.entrar()
          }else{
            console.log("El usuario ya existe");
          }
        })
      }
    }else{
      console.log("Las contraseñas no coinciden");
    }
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
