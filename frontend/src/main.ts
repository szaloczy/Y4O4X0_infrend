import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';  // Importáld az HttpClient-t
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideRouter([])]  // Add hozzá az HttpClient szolgáltatót
}).catch((err) => console.error(err));
