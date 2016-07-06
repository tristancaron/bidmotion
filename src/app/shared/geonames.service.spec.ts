/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { GeonamesService } from './geonames.service';
import { HTTP_PROVIDERS } from "@angular/http";

import { GeonameModel } from "./geoname.model";

describe('Geonames Service', () => {
  beforeEachProviders(() => [GeonamesService, HTTP_PROVIDERS]);

  it('should be injected',
      inject([GeonamesService], (service: GeonamesService) => {
    expect(service).toBeTruthy();
  }));

  it('should fetch data', inject([GeonamesService], (service: GeonamesService) => new Promise((resolve, reject) => {
    service.get().subscribe((data: [GeonameModel]) => {
      expect(data).toBeDefined();
      expect(data).toBeAnInstanceOf(Array);
      expect(data[0].north).toEqual(jasmine.any(Number));
      resolve();
    })
  })))
});
