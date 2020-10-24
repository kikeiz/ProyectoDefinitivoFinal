import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Alumno } from 'src/app/models/alumno';
import { ComportamientoService } from 'src/app/shared/comportamiento.service';

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
  public mensaje:boolean
  public alumnos: Alumno[]
  public nombreAlumno: string
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { 
    xAxes: [{}], 
    yAxes: [{ 
      id: 'y-axis-10',
    position: 'left'}] 
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Participacion', 'Atencion', 'Deberes', 'Puntualidad'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
 

  public barChartData: ChartDataSets[] = [
    { data: [7, 8, 9, 6], label: 'Enrique Izquierdo' },
    { data: [5, 9, 5, 10], label: 'Clase' }
  ];
  constructor(public comportamientoService:ComportamientoService){
    this.puntualidad = false
    this.deberes = false
    this.atencion = false
    this.comportamiento = false
    this.rojo = false
    this.verde = false
    this.tablaResumen = false
    this.mostrarF4 = false
    this.mensaje = false
    this.alumnos = this.comportamientoService.alumnos
    this.nombreAlumno = ""
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

  alumno(id:any){
    console.log(id);
    
    let i= 0
    let condicion = false
    while (i<this.alumnos.length && condicion == false){
      if(id = this.alumnos[i].id_alumno){
        this.nombreAlumno = this.alumnos[i].nombre + " " + this.alumnos[i].apellidos
        console.log(this.nombreAlumno);
        
        condicion = true
      }else{
        i++
      }
    }
  }

  actualizar(){
    this.rojo = false
    this.verde = false
    this.comportamiento = false
    this.atencion = false
    this.deberes = false
    this.puntualidad = false
    this.mensaje = false
    
  }

  mostrar(){
    this.tablaResumen = true
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

   envimes(){
     if(this.mensaje == false){
      this.mensaje = true
     }else{
       this.mensaje = false
     }
   }
   public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  
}
