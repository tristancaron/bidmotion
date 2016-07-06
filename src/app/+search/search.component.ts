import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, REACTIVE_FORM_DIRECTIVES } from "@angular/forms";

import { GeonameModel } from "../shared/geoname.model";
import { GeonamesService } from "../shared/geonames.service";
import { QueryModel } from "./query.model";

import { Subscription } from "rxjs/Rx";


@Component({
  moduleId: module.id,
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
  directives: [REACTIVE_FORM_DIRECTIVES],
  providers: [GeonamesService]
})
export class SearchComponent implements OnInit {
  private _geonamesSub: Subscription;

  queryForm = new FormGroup({
    continent: new FormControl('ALL'),
    metric: new FormControl('ALL'),
    chartMaxResult: new FormControl('ALL'),
  });
  continents = [];


  constructor(private _geonames: GeonamesService) {}

  ngOnInit() {
    this._getContinents();
  }

  onSubmit(query: QueryModel) {

  }

  private _getContinents() {
    const unique =
      (value, index, array) => array.indexOf(value) == index;
    const continentNames =
      (data: [GeonameModel]) => data.map(d => d.continentName).filter(unique).sort();


    this._geonamesSub = this._geonames.get().map(continentNames).subscribe(data => this.continents = data);
  }
}
