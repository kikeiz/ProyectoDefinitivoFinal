import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { MenuPadreComponent } from './pages/menu-padre/menu-padre.component';
import { MenuProfesorComponent } from './pages/menu-profesor/menu-profesor.component';
import { NotasProfesorComponent } from './pages/notas-profesor/notas-profesor.component';
import { NotasPadreComponent } from './pages/notas-padre/notas-padre.component';
import { AsistenciaProfesorComponent } from './pages/asistencia-profesor/asistencia-profesor.component';
import { AsistenciaPadreComponent } from './pages/asistencia-padre/asistencia-padre.component';
import { ComportamientoPadreComponent } from './pages/comportamiento-padre/comportamiento-padre.component';
import { ComportamientoProfesorComponent } from './pages/comportamiento-profesor/comportamiento-profesor.component';
import { InformacionPadreComponent } from './pages/informacion-padre/informacion-padre.component';
import { InformacionProfesorComponent } from './pages/informacion-profesor/informacion-profesor.component';
import { MensajeriaPadresComponent } from './pages/mensajeria-padres/mensajeria-padres.component';
import { MensajeriaProfesorComponent } from './pages/mensajeria-profesor/mensajeria-profesor.component';
import { AniadirClaseComponent } from './pages/aniadir-clase/aniadir-clase.component';
import { AniadirAlumnoComponent } from './pages/aniadir-alumno/aniadir-alumno.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HomePadreComponent } from './pages/home-padre/home-padre.component';
import { HomeProfesorComponent } from './pages/home-profesor/home-profesor.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent,
    MenuPadreComponent,
    MenuProfesorComponent,
    NotasProfesorComponent,
    NotasPadreComponent,
    AsistenciaProfesorComponent,
    AsistenciaPadreComponent,
    ComportamientoPadreComponent,
    ComportamientoProfesorComponent,
    InformacionPadreComponent,
    InformacionProfesorComponent,
    MensajeriaPadresComponent,
    MensajeriaProfesorComponent,
    AniadirClaseComponent,
    AniadirAlumnoComponent,
    HeaderComponent,
    FooterComponent,
    HomePadreComponent,
    HomeProfesorComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
