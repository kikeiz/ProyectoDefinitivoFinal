import { Component, OnInit } from '@angular/core';
import { TickOptions } from 'chart.js';
import { Nota } from 'src/app/models/nota';
import {Tipo} from 'src/app/models/nota'

@Component({
  selector: 'app-notas-padre',
  templateUrl: './notas-padre.component.html',
  styleUrls: ['./notas-padre.component.css']
})
export class NotasPadreComponent implements OnInit {
  public options: boolean
  public notas: Nota []
  constructor() { 
    this.options = false
    this.notas = [new Nota(new Date(), 5, Tipo.examen, 2, 5, 2)] 
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

  filter(){
    this.options = false
  }
}
