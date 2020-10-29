import { Component, OnInit,ViewChild } from '@angular/core';
import {NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AñadirClaseService } from 'src/app/shared/añadir-clase.service';
import {PerfilPadre} from 'src/app/models/perfil-padre'
import {Alumno} from'src/app/models/alumno';
import { PerfilService } from 'src/app/shared/perfil.service';

  import { from } from 'rxjs';
@Component({
  selector: 'app-home-padre',
  templateUrl: './home-padre.component.html',
  styleUrls: ['./home-padre.component.css'],
  providers:[NgbCarouselConfig]
})
export class HomePadreComponent implements OnInit {
 
  public porcentage
  public alumno:Alumno[]
  ngOnInit(): void {
  }
  constructor(public servicePerfil:PerfilService,public serviceAñadirClase:AñadirClaseService) {
      // this.alumno =this.serviceAñadirClase.alumno
  }
  

}