import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';  // Importáld az HttpClient-t
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideRouter([]), provideAnimationsAsync()]  // Add hozzá az HttpClient szolgáltatót
}).catch((err) => console.error(err));
