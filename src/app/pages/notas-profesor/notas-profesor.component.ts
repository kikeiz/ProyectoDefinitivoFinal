import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notas-profesor',
  templateUrl: './notas-profesor.component.html',
  styleUrls: ['./notas-profesor.component.css']
})
export class NotasProfesorComponent implements OnInit {
  public mostrarF1: boolean
  public mostrarF2: boolean
  public mostrarF3: boolean
  public mostrarF4: boolean
  constructor() { 
    this.mostrarF1 = false
    this.mostrarF2 = false
    this.mostrarF3 = false
    this.mostrarF4 = false
  }

  ngOnInit(): void {
  }
  anadirNota(){
    this.mostrarF1 = true
  }

  insertarNotas(){
    this.mostrarF2 = true
  }

  actualizar(){
    this.mostrarF1 = false
    this.mostrarF2 = false
  }

  editar(){
    this.mostrarF3 = true
  }

  cerrar(){
    this.mostrarF1 = false
    this.mostrarF2 = false
    this.mostrarF3 = false
  }

  cambiar(){
   this.mostrarF4 = true
  }

  modificar(){
    this.mostrarF4 = false
  }
}
