import { Component, OnInit } from '@angular/core';
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

  editar(){
      this.mostrar = true
  }

  ocultar(){
    this.mostrar = false
  }
}
