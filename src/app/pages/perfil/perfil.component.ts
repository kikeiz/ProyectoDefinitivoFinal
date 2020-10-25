import { Component, OnInit } from '@angular/core';
import { PerfilProfesor } from 'src/app/models/perfil-profesor';
import { LoginService } from 'src/app/shared/login.service';
import { AñadirClaseService } from 'src/app/shared/añadir-clase.service';
import { PerfilService } from 'src/app/shared/perfil.service';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  fileToUpload: File = null
  public mostrar:boolean
  public profesor: PerfilProfesor
  public avatarElegido: any



  constructor(public service: LoginService, public serviceId: AñadirClaseService, public servicePerfil: PerfilService) { 
    this.service = service
    this.serviceId = serviceId
    this.mostrar = false
    this.profesor = this.servicePerfil.profesor

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

   editar(){
       this.mostrar = true
   }

   ocultar(){
     this.mostrar = false
  }

    actualizarFoto() {
      let foto = document.getElementById("fotosubida") as HTMLInputElement;
      let fotoSelected = foto.files[0];
      let reader: any = new FileReader();
      let dataUrl;
      reader.readAsDataURL(fotoSelected); // primero  antes de ejecutar onloadend

      reader.onloadend = function() {
         dataUrl = reader.result;

         this.avatarElegido = document.getElementById("avatar") as HTMLElement
          this.avatarElegido.src = dataUrl

        
      };

    }
}
