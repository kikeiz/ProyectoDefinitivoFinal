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
    this.notas = [new Nota(7.5, "1998-07-08", Tipo.examen, "biologia" ), 
                  new Nota(4.5, "2008-07-08", Tipo.trabajo, "Matematicas" )]
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
