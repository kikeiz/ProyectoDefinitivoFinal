import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comportamiento-profesor',
  templateUrl: './comportamiento-profesor.component.html',
  styleUrls: ['./comportamiento-profesor.component.css']
})
export class ComportamientoProfesorComponent implements OnInit {
  public puntualidad: boolean
  public deberes: boolean
  public atencion:boolean
  public comportamiento:boolean
  public rojo:boolean
  public verde:boolean
  public tablaResumen:boolean
  public nombre:string
  public mostrarF4:boolean
  constructor(){
    this.puntualidad = false
    this.deberes = false
    this.atencion = false
    this.comportamiento = false
    this.rojo = false
    this.verde = false
    this.tablaResumen = false
    this.mostrarF4 = false
   }

  ngOnInit(): void {
  }

  resaltar(valor:number){
    if(valor == 0){
      this.puntualidad = true;
      this.atencion = false;
      this.comportamiento = false;
      this.deberes = false
    }else if(valor == 1){
      this.atencion = true;
      this.comportamiento = false;
      this.deberes = false;
      this.puntualidad = false;
    }else if(valor ==2){
      this.deberes = true;
      this.atencion = false;
      this.comportamiento = false;
      this.puntualidad = false;
    }else{
      this.comportamiento = true;
      this.deberes = false;
      this.atencion = false;
      this.puntualidad = false;
    }
  }

  color(color:number){
    if(color == 0){
      this.rojo = true
      this.verde = false
    }else{
      this.verde = true
      this.rojo = false
    }
  }

  actualizar(){
    this.rojo = false
    this.verde = false
    this.comportamiento = false
    this.atencion = false
    this.deberes = false
    this.puntualidad = false
  }

  mostrar(tipo:string){
    this.tablaResumen = true
    this.nombre = tipo
  }
  cambiar(){
    this.mostrarF4 = true
   }
 
   modificar(){
     this.mostrarF4 = false
   }

   terminar(){
     this.tablaResumen = false
   }
}
