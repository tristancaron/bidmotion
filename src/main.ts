import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { provideRouter } from "@angular/router";
import { provideForms } from "@angular/forms";
import { HTTP_PROVIDERS } from "@angular/http";

import { AppComponent, environment } from './app/';
import { routes } from "./app/app.routes";

import { GeonamesService } from "./app/shared/geonames.service";

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  provideRouter(routes),
  provideForms(),

  GeonamesService
]);

