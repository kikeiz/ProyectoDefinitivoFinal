import { Component, OnInit } from '@angular/core';
import { Asistencia } from 'src/app/models/asistencia';
import { AsistenciaService } from 'src/app/shared/asistencia.service';

@Component({
  selector: 'app-asistencia-padre',
  templateUrl: './asistencia-padre.component.html',
  styleUrls: ['./asistencia-padre.component.css']
})
export class AsistenciaPadreComponent implements OnInit {
  public faltas: Asistencia[]
  constructor(public serviceAsistencia:AsistenciaService) {
    this.faltas = this.serviceAsistencia.faltas
   }

  ngOnInit(): void {
  }

}
