import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LocationEditorComponent } from './location-editor/location-editor.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'create-location', component: LocationEditorComponent},
    { path: 'edit-location/:id', component: LocationEditorComponent}
];
