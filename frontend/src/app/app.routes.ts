import { Routes } from '@angular/router';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth-guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WarehouseComponent } from './pages/warehouse/warehouse.component';

export const routes: Routes = [
    { path: 'login', component: UserLoginComponent },
    { path: 'register', component: UserRegisterComponent },
    { path: 'home', component: HomeComponent, canActivate: [authGuard]},
    { path: 'dashboard', component: DashboardComponent },
    { path: 'warehouse', component: WarehouseComponent },
    { path: '**', redirectTo: 'login'}
];
