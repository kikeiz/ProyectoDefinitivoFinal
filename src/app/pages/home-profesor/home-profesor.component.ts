import { Component, OnInit } from '@angular/core';
import { AñadirClaseService } from 'src/app/shared/añadir-clase.service';
import { HomeService } from 'src/app/shared/home.service';

@Component({
  selector: 'app-home-profesor',
  templateUrl: './home-profesor.component.html',
  styleUrls: ['./home-profesor.component.css']
})
export class HomeProfesorComponent implements OnInit {
  public clases:any
  constructor(public homeService:HomeService, public añadirClaseService: AñadirClaseService) {
    this.clases = this.homeService.clases
   }

  ngOnInit(): void {
  }

  mostrarAlumnos(index:number){
    if(this.clases[index].mostrar == true){
      this.clases[index].mostrar = false
    }else{
      this.clases[index].mostrar = true
    }
  }

  nombre(index:number){
    let nombre:string = this.clases[index].nombre_clase
    this.homeService.cambiarNombre(nombre)
    this.añadirClaseService.id_clase = this.clases[index].id_clase
  }

}
