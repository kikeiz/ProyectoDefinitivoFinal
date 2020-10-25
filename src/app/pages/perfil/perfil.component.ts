import { Component, OnInit } from '@angular/core';
import { PerfilProfesor } from 'src/app/models/perfil-profesor';
import { LoginService } from 'src/app/shared/login.service';
import { AñadirClaseService } from 'src/app/shared/añadir-clase.service';
import { PerfilService } from 'src/app/shared/perfil.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  fileToUpload: File = null
  public mostrar:boolean
  public profesor: PerfilProfesor



  constructor(public service: LoginService, public serviceId: AñadirClaseService, public servicePerfil: PerfilService) { 
    this.service = service
    this.serviceId = serviceId
    this.mostrar = false
    this.profesor = this.servicePerfil.profesor
  }
   


  ngOnInit(): void {

  }

   actualizar(){
    this.mostrar = false
    console.log(this.profesor.foto)
    this.profesor.id_profesor=this.serviceId.id_profesor
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
  subirFoto(imageInput: any) {
    console.log(imageInput.files[0].get)


    // this.fileToUpload= files.item(0);
    // this.profesor.foto=this.fileToUpload.name
    
  
}
actualizarFoto() {
  this.servicePerfil.putUsuario(this.profesor)
}
}
