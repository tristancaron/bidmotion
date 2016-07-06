import {Component, OnInit, Input} from '@angular/core';

import { GeonamesService } from "../../shared/geonames.service";
import { GeonameModel } from "../../shared/geoname.model";
import { TotalPipe } from "../../shared/total.pipe";

@Component({
  moduleId: module.id,
  selector: 'app-search-result',
  templateUrl: 'search-result.component.html',
  styleUrls: ['search-result.component.css'],
  pipes: [TotalPipe]
})
export class SearchResultComponent implements OnInit {
  @Input() metric: string;
  @Input() chartMaxResult: string;

  data: GeonameModel[] = null;

  constructor(private _geonames: GeonamesService) {}

  ngOnInit() {
  }

  @Input() set continent(continent: string) {
    this._geonames.get().toPromise().then(data => {
      this.data = this._filterData(data, continent);
    });
  }

  private _filterData(data: GeonameModel[], continent: string): GeonameModel[] {
    return data.map(value => {
      if (continent === 'ALL' || value.continentName === continent) return value;

      return null;
    }).filter(x => x !== null);
  }
}
