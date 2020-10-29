import { Component, OnInit } from '@angular/core';
import { PerfilProfesor } from 'src/app/models/perfil-profesor';
import { LoginService } from 'src/app/shared/login.service';
import { AñadirClaseService } from 'src/app/shared/añadir-clase.service';
import { PerfilService } from 'src/app/shared/perfil.service';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import {PerfilPadre} from 'src/app/models/perfil-padre'
import { AñadirAlumnoService } from 'src/app/shared/añadir-alumno.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  fileToUpload: File = null
  public mostrar:boolean
  public profesor: PerfilProfesor
  public padre: PerfilPadre
  public avatarElegido: any
  public avatarElegidoPadre: any



  constructor(public service: LoginService, public serviceId: AñadirClaseService, public servicePerfil: PerfilService, public añadirAlumnoService:AñadirAlumnoService) { 
    this.service = service
    this.serviceId = serviceId
    this.mostrar = false
    this.profesor = this.servicePerfil.profesor
    this.padre= this.servicePerfil.padre
    console.log(this.padre)

    }
   

  ngOnInit(): void {
  }

   actualizar(){
    this.avatarElegido = document.getElementById("avatar") as HTMLElement
    this.mostrar = false
    this.profesor.id_profesor=this.serviceId.id_profesor
    this.profesor.foto = this.avatarElegido.src
    this.servicePerfil.putUsuario(this.profesor).subscribe((data) =>
    {
      console.log(data);
    })
   }

  
   ocultar(){
     this.mostrar = false
   }

  editar(id_Padre:number,nombre:string,apellidos:string,descripcion:string,username:string,password:string,email:string){
      this.mostrar = true
      let perfilPadre = new PerfilPadre(id_Padre,nombre,apellidos,descripcion,username,password,email)
      this.servicePerfil.putUsuarioPadre(perfilPadre).subscribe((data =>{
        console.log(data);
        console.log("Actualizado!");  
      }))

  }

    actualizarFoto() {
      let foto = document.getElementById("fotosubida") as HTMLInputElement;
      let fotoSelected = foto.files[0];
      let reader: any = new FileReader();
      let dataUrl;
      reader.readAsDataURL(fotoSelected); 

      reader.onloadend = function() {
         dataUrl = reader.result;

         this.avatarElegido = document.getElementById("avatar") as HTMLElement
          this.avatarElegido.src = dataUrl        
      };

    }

    actualizarPadre(){
    this.avatarElegidoPadre = document.getElementById("avatarPadre") as HTMLElement
    this.mostrar = false
    this.padre.id_padre=this.añadirAlumnoService.id_padre
    this.padre.foto = this.avatarElegidoPadre.src
    console.log(this.añadirAlumnoService.id_padre);
    
    this.servicePerfil.putUsuarioPadre(this.padre).subscribe((data) =>
    {
      
      console.log(data)
    })
   }

    actualizarFotoPadre(){
      let fotoPadre = document.getElementById("fotosubidaPadre") as HTMLInputElement;
      let fotoSelectedd = fotoPadre.files[0];
      let reader: any = new FileReader();
      let dataUrl;
      reader.readAsDataURL(fotoSelectedd); 

      reader.onloadend = function() {
         dataUrl = reader.result;

         this.avatarElegidoPadre = document.getElementById("avatarPadre") as HTMLElement
          this.avatarElegidoPadre.src = dataUrl

      }}
}
