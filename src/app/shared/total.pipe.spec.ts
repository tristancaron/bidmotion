/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { TotalPipe } from './total.pipe';

describe('Pipe: Total', () => {
  it('create an instance', () => {
    let pipe = new TotalPipe();
    expect(pipe).toBeTruthy();
  });
});
