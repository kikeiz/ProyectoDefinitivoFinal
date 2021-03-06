import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AniadirAlumnoComponent } from './pages/aniadir-alumno/aniadir-alumno.component';
import { AniadirClaseComponent } from './pages/aniadir-clase/aniadir-clase.component';
import { AsistenciaPadreComponent } from './pages/asistencia-padre/asistencia-padre.component';
import { AsistenciaProfesorComponent } from './pages/asistencia-profesor/asistencia-profesor.component';
import { ComportamientoPadreGlobalComponent } from './pages/comportamiento-padre-global/comportamiento-padre-global.component';
import { ComportamientoPadreComponent } from './pages/comportamiento-padre/comportamiento-padre.component';
import { ComportamientoProfesorComponent } from './pages/comportamiento-profesor/comportamiento-profesor.component';
import { HomePadreComponent } from './pages/home-padre/home-padre.component';
import { HomeProfesorComponent } from './pages/home-profesor/home-profesor.component';
import { MensajeriaPadresComponent } from './pages/mensajeria-padres/mensajeria-padres.component';
import { MensajeriaProfesorComponent } from './pages/mensajeria-profesor/mensajeria-profesor.component';
import { NotasPadreComponent } from './pages/notas-padre/notas-padre.component';
import { NotasProfesorComponent } from './pages/notas-profesor/notas-profesor.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

const routes: Routes = [
  {path: "mainPadre", component:HomePadreComponent},
  {path: "mainProfe", component:HomeProfesorComponent},
  {path: "mainNotasPadre", component:NotasPadreComponent},
  {path:"mainNotasProfesor", component:NotasProfesorComponent},
  {path: "comportamientoPadre", component: ComportamientoPadreComponent},
  {path:"comportamientoProfesor", component:ComportamientoProfesorComponent},
  {path:"mensajesPadre", component:MensajeriaPadresComponent},
  {path:"mensajesProfe", component:MensajeriaProfesorComponent},
  {path:"asistenciaPadre", component:AsistenciaPadreComponent},
  {path:"asistenciaProfesor", component:AsistenciaProfesorComponent},
  {path:"perfil", component:PerfilComponent},
  {path:"aniadirClase", component:AniadirClaseComponent},
  {path:"aniadirAlumno", component:AniadirAlumnoComponent},
  {path:"comportamientoGlobal", component:ComportamientoPadreGlobalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
