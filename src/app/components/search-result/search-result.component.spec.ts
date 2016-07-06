/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { SearchResultComponent } from './search-result.component';
import { GeonamesService } from "../../shared/geonames.service";

beforeEachProviders(() => [GeonamesService]);

describe('Component: SearchResult', () => {
  it('should create an instance', inject([GeonamesService], (service: GeonamesService) => {
    let component = new SearchResultComponent(service);
    expect(component).toBeTruthy();
  }));
});
