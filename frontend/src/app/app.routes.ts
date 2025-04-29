import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LocationEditorComponent } from './location-editor/location-editor.component';
import { AddClientComponent } from './add-client/add-client.component';
import { DonationsComponent } from './donations/donations.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent},
    { path: 'create-location', component: LocationEditorComponent },
    { path: 'edit-location/:id', component: LocationEditorComponent },
    { path: 'add-client/:id', component: AddClientComponent },
    { path: 'donations', component: DonationsComponent }
];
