import { Component, OnInit } from '@angular/core';
import { PerfilPadre } from 'src/app/models/perfil-padre';
import { PerfilProfesor } from 'src/app/models/perfil-profesor';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public mostrar: boolean

  constructor(public service: LoginService) { 
    this.mostrar = false
  }

  ngOnInit(): void {
  }

  actualizar(data:string){
    console.log(data);
    this.mostrar = true
  }

  editar(id_Padre:number,nombre:string,apellidos:string,descripcion:string,username:string,password:string,email:string){
      this.mostrar = true
      let perfilPadre = new PerfilPadre(id_Padre,nombre,apellidos,descripcion,username,password,email)
      this.service.editarPerfilPadre(perfilPadre).subscribe((data =>{
        console.log(data);
        console.log("Actualizado!");  
      }))
  }

  ocultar(){
    this.mostrar = false
  }
}
