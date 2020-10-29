import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/shared/home.service';

@Component({
  selector: 'app-home-profesor',
  templateUrl: './home-profesor.component.html',
  styleUrls: ['./home-profesor.component.css']
})
export class HomeProfesorComponent implements OnInit {
  public clases:any
  constructor(public homeService:HomeService) {
    this.clases = this.homeService.clases
   }

  ngOnInit(): void {
  }

  mostrarAlumnos(index:number){
    if(this.clases[index].mostrar == true){
      this.clases[index].mostrar = false
    }else{
      this.clases[index].mostrar = true
    }
  }

}
