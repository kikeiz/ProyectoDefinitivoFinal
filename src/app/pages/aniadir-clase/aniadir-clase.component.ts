import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aniadir-clase',
  templateUrl: './aniadir-clase.component.html',
  styleUrls: ['./aniadir-clase.component.css']
})
export class AniadirClaseComponent implements OnInit {
  public insertar:boolean

  constructor() {
    this.insertar = false
   }

  ngOnInit(): void {
  }

  insertarAlumnos(){
    this.insertar = true
  }

  crearClase(data:any){
    this.insertar = false
  }
}
