/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { SearchComponent } from './search.component';

import { GeonamesService } from "../shared/geonames.service";
import {provideRouter, Router} from "@angular/router";
import {routes} from "../app.routes";

beforeEachProviders(() => [GeonamesService, provideRouter(routes)]);

describe('Component: Search', () => {
  it('should create an instance', inject([GeonamesService, Router], (service: GeonamesService, router: Router) => {
    let component = new SearchComponent(service, router);
    expect(component).toBeTruthy();
  }));
});
