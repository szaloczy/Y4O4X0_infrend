import { Routes } from '@angular/router';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { authGuard } from './guards/auth-guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WarehouseComponent } from './pages/warehouse/warehouse.component';
import { AppComponent } from './app.component';
import { PartsListComponent } from './pages/parts-list/parts-list.component';

export const routes: Routes = [
    { path: 'login', component: UserLoginComponent },
    { path: 'register', component: UserRegisterComponent },
    { path: '', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'warehouse', component: WarehouseComponent, canActivate: [authGuard] },
    { path: 'parts', component: PartsListComponent, canActivate: [authGuard]},
    { path: '**', redirectTo: 'login' }
];
