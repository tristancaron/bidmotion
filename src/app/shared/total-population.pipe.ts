import { Pipe, PipeTransform } from '@angular/core';

import { GeonameModel } from "./geoname.model";

@Pipe({
  name: 'totalPopulation'
})
export class TotalPopulationPipe implements PipeTransform {
  transform(value: [GeonameModel]): string {
    if (!value) return "0";

    return value.reduce((acc, row, index, arr) => `${+acc + +row.population}`, "0");
  }

}
