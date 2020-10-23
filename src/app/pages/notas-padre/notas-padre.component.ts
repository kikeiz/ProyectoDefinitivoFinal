import { Component, OnInit } from '@angular/core';
import { TickOptions } from 'chart.js';
import { Hijos } from 'src/app/models/hijos';
import { Nota } from 'src/app/models/nota';
import {Tipo} from 'src/app/models/nota'
import { NotasService } from 'src/app/shared/notas.service';

@Component({
  selector: 'app-notas-padre',
  templateUrl: './notas-padre.component.html',
  styleUrls: ['./notas-padre.component.css']
})
export class NotasPadreComponent implements OnInit {
  public options: boolean
  public notas: Nota []
  public nota:Hijos[]
  constructor(public notaService:NotasService) { 
    this.options = false
    this.notas = [new Nota(new Date(), 5, Tipo.examen, 2, 5, 2)] 
    this.nota = this.notaService.nota
  }

  ngOnInit(): void {
  }

  opciones(){
    if(this.options==true){
      this.options = false
    }else{
      this.options = true
    }
  }

  // filter(data:any){
  //   this.options = false
  //   if(data.estadoNota == "suspenso"){

  //   }else{

  //   }
    
  // }
}
