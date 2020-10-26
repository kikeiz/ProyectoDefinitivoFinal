import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { Alumno } from 'src/app/models/alumno';
import { Clase } from 'src/app/models/clase';
import { Comportamiento, TipoComportamiento } from 'src/app/models/comportamiento';
import { AñadirAlumnoService } from 'src/app/shared/añadir-alumno.service';
import { ComportamientoService } from 'src/app/shared/comportamiento.service';

@Component({
  selector: 'app-comportamiento-padre-global',
  templateUrl: './comportamiento-padre-global.component.html',
  styleUrls: ['./comportamiento-padre-global.component.css']
})


export class ComportamientoPadreGlobalComponent implements OnInit {
  public clases: Clase[]
  public comportamientos:Comportamiento[]
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
    { data: [0, 0, 0, 0], label: '' },
    { data: [0, 0, 0, 0], label: 'Clase' }
  ];
  constructor(public comportamientoService:ComportamientoService, public añadirAlumnoService:AñadirAlumnoService) {
    this.clases = this.comportamientoService.clases
    this.comportamientos = []
   }
  
 @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective


  ngOnInit(): void {
  }

  cambioClase(id:any){
    this.comportamientoService.mediaClase(id).subscribe((data=>{
      let array:any = data
      console.log(array);
      for(let i=0; i<array.length; i++){
        if(array[i].tipo_comportamiento == "puntualidad"){
          this.barChartData[1].data[3] = array[i].nota_media
        }else if(array[i].tipo_comportamiento == "atencion"){
          this.barChartData[1].data[1] = array[i].nota_media
        }else if(array[i].tipo_comportamiento == "participacion"){
          this.barChartData[1].data[0] = array[i].nota_media
        }else{
          this.barChartData[1].data[2] = array[i].nota_media
        }
      }
      this.chart.chart.update()
    }))
    this.comportamientoService.comportamientosAlumno(this.añadirAlumnoService.id_alumno, id).subscribe((data=>{
      let array:any = data
      for(let i=0; i<array.length; i++){
        if(array[i].tipo_comportamiento == "atencion"){
          this.barChartData[0].data[1] = array[i].nota
          this.barChartData[0].label = array[i].nombre + " "+ array[i].apellidos
        }else if(array[i].tipo_comportamiento == "deberes"){
          this.barChartData[0].data[2] = array[i].nota
          this.barChartData[0].label = array[i].nombre + " "+ array[i].apellidos
        }else if(array[i].tipo_comportamiento == "participacion"){
          this.barChartData[0].data[0] = array[i].nota
          this.barChartData[0].label = array[i].nombre + " "+ array[i].apellidos
        }else{
          this.barChartData[0].data[3] = array[i].nota
          this.barChartData[0].label = array[i].nombre + " "+ array[i].apellidos
        }
      }
      this.chart.chart.update()
      console.log(data);
    }))
  }
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  

}
