import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LocationEditorComponent } from './location-editor/location-editor.component';
import { AddClientComponent } from './add-client/add-client.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'create-location', component: LocationEditorComponent },
    { path: 'edit-location/:id', component: LocationEditorComponent },
    { path: 'add-client', component: AddClientComponent }
];
