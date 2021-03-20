// Importar modulos y router
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar componentes
import { HomeComponent } from './components/home/home.component';
import { CharactersComponent } from './components/characters/characters.component';
import { StudentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { RequestsComponent } from './components/requests/requests.component'
import { ErrorComponent } from './components/error/error.component';

// Router y export
const appRouter: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'inicio'
    },
    {
        path: 'inicio',
        pathMatch: 'full',
        component: HomeComponent
    },
    {
        path: 'personajes',
        pathMatch: 'full',
        component: CharactersComponent
    },
    {
        path: 'profesores',
        pathMatch: 'full',
        component: TeachersComponent
    },
    {
        path: 'estudiantes',
        pathMatch: 'full',
        component: StudentsComponent
    },
    {
        path: 'estudiantes/solicitudes',
        pathMatch: 'full',
        component: RequestsComponent
    },
    {
        path: '**',
        component: ErrorComponent
    }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders <any> = RouterModule.forRoot(appRouter);