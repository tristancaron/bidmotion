import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { provideRouter } from "@angular/router";
import { disableDeprecatedForms, provideForms } from "@angular/forms";

import { AppComponent, environment } from './app/';
import { routes } from "./app/app.routes";

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  provideRouter(routes),

  disableDeprecatedForms(),
  provideForms(),
]);

