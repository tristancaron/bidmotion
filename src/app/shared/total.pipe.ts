import { Pipe, PipeTransform } from '@angular/core';

import { GeonameModel } from "./geoname.model";

@Pipe({
  name: 'total'
})
export class TotalPipe implements PipeTransform {
  transform(value: [GeonameModel], selector: 'areaInSqKm' | 'population'): string {
    if (!value) return "0";

    return value.reduce((acc, row, index, arr) => `${+acc + +row[selector]}`, "0");
  }

}
