import {Component, OnInit, Input} from '@angular/core';

import { GeonamesService } from "../../shared/geonames.service";
import { GeonameModel } from "../../shared/geoname.model";
import { TotalPopulationPipe } from "../../shared/total-population.pipe";

@Component({
  moduleId: module.id,
  selector: 'app-search-result',
  templateUrl: 'search-result.component.html',
  styleUrls: ['search-result.component.css'],
  pipes: [TotalPopulationPipe]
})
export class SearchResultComponent implements OnInit {
  @Input() continent: string;
  @Input() metric: string;
  @Input() chartMaxResult: string;

  data: [GeonameModel] = null;

  constructor(private _geonames: GeonamesService) {}

  ngOnInit() {
    this._geonames.get().toPromise().then(d => this.data = d);
  }
}
