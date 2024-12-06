import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'generate-qr/:id',
    loadChildren: () => import('./pages/generate-qr/generate-qr.module').then(m => m.GenerateQrPageModule)
  },
  {
    path: 'scan-qr',
    loadChildren: () => import('./pages/scan-qr/scan-qr.module').then(m => m.ScanQrPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'docente',
    loadChildren: () => import('./pages/docente/docente.module').then( m => m.DocentePageModule)
  },
  {
    path: 'alumno',
    loadChildren: () => import('./pages/alumno/alumno.module').then( m => m.AlumnoPageModule)
  },
  {
    path: 'cursos-docente',
    loadChildren: () => import('./pages/cursos-docente/cursos-docente.module').then( m => m.CursosDocentePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'crear-curso',
    loadChildren: () => import('./pages/crear-curso/crear-curso.module').then( m => m.CrearCursoPageModule)
  },
  {
    path: 'cursos-estudiante',
    loadChildren: () => import('./pages/cursos-estudiante/cursos-estudiante.module').then( m => m.CursosEstudiantePageModule)
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./pages/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  {
    path: 'ingresar-curso/:id',
    loadChildren: () => import('./pages/ingresar-curso/ingresar-curso.module').then( m => m.IngresarCursoPageModule)
  },
  {
    path: 'lista-docente/:id',
    loadChildren: () => import('./pages/lista-docente/lista-docente.module').then( m => m.ListaDocentePageModule)
  },
  {
    path: 'cursos-asistencia',
    loadChildren: () => import('./pages/cursos-asistencia/cursos-asistencia.module').then( m => m.CursosAsistenciaPageModule)
  }





];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
