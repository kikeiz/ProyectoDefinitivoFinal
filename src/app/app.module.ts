import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { NotasProfesorComponent} from './pages/notas-profesor/notas-profesor.component';
import { NotasPadreComponent } from './pages/notas-padre/notas-padre.component';
import { AsistenciaProfesorComponent } from './pages/asistencia-profesor/asistencia-profesor.component';
import { AsistenciaPadreComponent } from './pages/asistencia-padre/asistencia-padre.component';
import { ComportamientoPadreComponent } from './pages/comportamiento-padre/comportamiento-padre.component';
import { ComportamientoProfesorComponent } from './pages/comportamiento-profesor/comportamiento-profesor.component';
import { MensajeriaPadresComponent } from './pages/mensajeria-padres/mensajeria-padres.component';
import { MensajeriaProfesorComponent } from './pages/mensajeria-profesor/mensajeria-profesor.component';
import { AniadirClaseComponent } from './pages/aniadir-clase/aniadir-clase.component';
import { AniadirAlumnoComponent } from './pages/aniadir-alumno/aniadir-alumno.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { HomePadreComponent } from './pages/home-padre/home-padre.component';
import { HomeProfesorComponent } from './pages/home-profesor/home-profesor.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'


@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent,
    NotasProfesorComponent,
    NotasPadreComponent,
    AsistenciaProfesorComponent,
    AsistenciaPadreComponent,
    ComportamientoPadreComponent,
    ComportamientoProfesorComponent,
    MensajeriaPadresComponent,
    MensajeriaProfesorComponent,
    AniadirClaseComponent,
    AniadirAlumnoComponent,
    HeaderComponent,
    FooterComponent,
    HomePadreComponent,
    HomeProfesorComponent,
    PerfilComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule, 
    FormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

