import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { AddComponent } from './Components/add/add.component';
import { DetalhesComponent } from './Components/detalhes/detalhes.component';
import { ErrorComponent } from './Components/error/error.component';
import { EditarComponent } from './Components/editar/editar.component';
import { FormComponent } from './Components/form/form.component';
import { GerenciamentoComponent } from './Components/gerenciamento/gerenciamento.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { MasterComponent } from './paginas/master/master.component';
import { authGuard } from './Config/auth.guard';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', component: MasterComponent, canActivate: [authGuard], children: [
        {path: 'home', component: HomeComponent},
        {path: 'adicionar', component: AddComponent},
        {path: 'gerenciamento', component: GerenciamentoComponent, data:{profile: 'ADMIN'}},
        {path: 'dashboard', component: DashboardComponent, data:{profile: 'ADMIN'}},
    ]},
    {path: '**', component: ErrorComponent},
];
