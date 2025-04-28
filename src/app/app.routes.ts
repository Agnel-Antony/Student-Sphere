import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { StudentsComponent } from './students/students.component';
import { PnfComponent } from './pnf/pnf.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    
    {
        path:'', component:HomeComponent
    },
    {
        path:'login', component:LoginComponent
    },
    {
        path:'students', component:StudentsComponent
    },
    {
        path:'dashboard', component:DashboardComponent
    },
    {
        path:'**', component:PnfComponent
    }
];
