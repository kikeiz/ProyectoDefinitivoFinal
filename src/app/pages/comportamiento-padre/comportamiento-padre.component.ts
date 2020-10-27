import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';

@Component({
  selector: 'app-comportamiento-padre',
  templateUrl: './comportamiento-padre.component.html',
  styleUrls: ['./comportamiento-padre.component.css']
})
export class ComportamientoPadreComponent implements OnInit {
  //Gráfico de lineas
  public progreso:boolean
  public lineChartData: ChartDataSets[] = [
    { data: [6.5, 5.9, 8, 8.1, 5.6, 5.5, 4, 5, 8, 10], label: 'Participacion' },
    { data: [2.8, 4.8, 4, 1.9, 8.6, 2.7, 9, 5, 1.5, 10], label: 'Deberes' },
    { data: [1.8, 4.8, 7.7, 9, 10, 2.7, 4, 6, 10, 5], label: 'Atencion'},
    { data: [1.8, 6.8, 7, 9.9, 5.6, 4.7, 5, 2.7, 9, 8], label: 'Puntualidad'}
  ]
  public lineChartLabels: Label[] = ['Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-10',
          position: 'left',
        },
        {
          id: 'y-axis-100%',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // green
      backgroundColor: 'rgba(173,255,47,0.2)',
      borderColor: 'green',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      backgroundColor: 'rgba(65,105,225,0.3)',
      borderColor: 'blue',
      pointBackgroundColor: 'rgba(148,100,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  // GRAFICO DE BARRAS


  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective
  constructor() {
    this.progreso = false
  }

  ngOnInit(): void {
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  


  


}


