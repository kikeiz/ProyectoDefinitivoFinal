import { Component, OnInit } from '@angular/core';
import { AñadirClaseService } from 'src/app/shared/añadir-clase.service';
import { HomeService } from 'src/app/shared/home.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'


@Component({
  selector: 'app-home-profesor',
  templateUrl: './home-profesor.component.html',
  styleUrls: ['./home-profesor.component.css']
})
export class HomeProfesorComponent implements OnInit {
  public clases:any
  public alumnos:any
  public ids:number[]
  public content:boolean
  public indice:number
  constructor(public homeService:HomeService, public añadirClaseService: AñadirClaseService, private modal:NgbModal) {
    this.clases = this.homeService.clases
    this.ids = []
    this.content = false
   }

  ngOnInit(): void {
  }

  anadirAlumnos(index:number, contenido){
    this.indice = index
    console.log(this.clases[index].id_curso, this.clases[index].id_colegio);
    this.homeService.alumnosExtra(this.clases[index].id_curso, this.clases[index].id_colegio, this.clases[index].id_clase).subscribe((data=>{
      let array:any = data
      this.alumnos = array
      console.log(this.alumnos);
      
      this.modal.open(contenido, {backdropClass: 'light-blue-backdrop'})
    }))
  }

  chequeado(id:number, isChecked:boolean){
    if(isChecked){
      this.ids.push(id)
      console.log(this.ids);
    }else{
      let valor = this.ids.indexOf(id)
      this.ids.splice(valor, 1)
      console.log(this.ids);
    }
  }

  enviar(){
    this.content = true
    for(let i =0; i< this.ids.length; i++){
      this.añadirClaseService.alumnosClase(this.ids[i], this.clases[this.indice].id_clase).subscribe((data=>{
        console.log(data);
      }))
    }
    setTimeout(()=>{
      this.modal.dismissAll()
      this.content = false
      this.homeService.obtenerClases(this.añadirClaseService.id_profesor)
    },2000)
  }

  mostrarAlumnos(index:number){
    if(this.clases[index].mostrar == true){
      this.clases[index].mostrar = false
    }else{
      this.clases[index].mostrar = true
    }
  }

  nombre(index:number){
    let nombre:string = this.clases[index].nombre_clase
    this.homeService.cambiarNombre(nombre)
    this.añadirClaseService.idClase(this.clases[index].id_clase, this.clases[index].id_colegio, this.clases[index].id_curso)
  }

}
