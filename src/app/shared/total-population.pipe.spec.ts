/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { TotalPopulationPipe } from './total-population.pipe';

describe('Pipe: TotalPopulation', () => {
  it('create an instance', () => {
    let pipe = new TotalPopulationPipe();
    expect(pipe).toBeTruthy();
  });
});
