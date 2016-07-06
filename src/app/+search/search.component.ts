import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, REACTIVE_FORM_DIRECTIVES } from "@angular/forms";
import { Router } from "@angular/router";

import { GeonameModel } from "../shared/geoname.model";
import { GeonamesService } from "../shared/geonames.service";


@Component({
  moduleId: module.id,
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
  directives: [REACTIVE_FORM_DIRECTIVES],
  providers: [GeonamesService]
})
export class SearchComponent implements OnInit, OnDestroy {
  private _submitClicked: boolean = false;

  queryForm = new FormGroup({
    continent: new FormControl('ALL'),
    metric: new FormControl('ALL'),
    chartMaxResult: new FormControl('5'),
  });
  continents = [];


  constructor(private _geonames: GeonamesService, private _router: Router) {}

  ngOnInit() {
    this._getContinents().then(_ => this._handleQueryParameters());
  }

  ngOnDestroy() {

  }

  onSubmit() {
    this._submitClicked = true;
    this._router.navigate(['/search'], {queryParams: this.queryForm.value});
  }

  private _getContinents(): Promise<any> {
    const unique =
      (value, index, array) => array.indexOf(value) === index;
    const continentNames =
      (data: [GeonameModel]) => data.map(d => d.continentName).filter(unique).sort();


    return this._geonames.get().map(continentNames).toPromise().then(data => this.continents = data);
  }

  private _handleQueryParameters() {
    this._router.routerState.queryParams.subscribe(params => {
      if (!this._submitClicked) {
        const filter = (key: string) => {
          const filters = {
            continent: value => this.continents.indexOf(value) !== -1 || value === 'ALL',
            metric: value => ['ALL', 'population', 'areaInSqKm'].indexOf(value) !== -1,
            chartMaxResult: value => ['5', '10', '15', '20'].indexOf(value) !== -1,
          };

          return filters[key] && filters[key](params[key]);
        };

        Object.keys(params).filter(filter).forEach(k => {
          (<FormControl>this.queryForm.controls[k]).updateValue(params[k]);
        })
      }
    });
  }
}
