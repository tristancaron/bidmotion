import { Component, Input } from '@angular/core';

import { GeonamesService } from "../../shared/geonames.service";
import { GeonameModel } from "../../shared/geoname.model";
import { TotalPipe } from "../../shared/total.pipe";

import "highcharts-lib";

declare const $: Function;

@Component({
  moduleId: module.id,
  selector: 'app-search-result',
  templateUrl: 'search-result.component.html',
  styleUrls: ['search-result.component.css'],
  pipes: [TotalPipe]
})
export class SearchResultComponent {
  private _geonamesCall: Promise<GeonameModel[]>;
  private _lastTarget: HTMLSpanElement = null;
  private _caret = {
    up: '▴',
    down: '▾',
    center: '◂'
  };

  data: GeonameModel[] = null;

  constructor(private _geonames: GeonamesService) {
    this._geonamesCall = this._geonames.get().toPromise();
  }

  @Input() set continent(continent: string) {
    this._geonamesCall.then(data => {
      this.data = this._filterData(data, continent);
    });
  }

  private _metric: string;
  @Input() set metric(metric: string) {
    this._metric = metric;

    this._geonamesCall.then(this._updateCharts.bind(this));
  }

  private _chartMaxResult: string;
  @Input() set chartMaxResult(chartMaxResult: string) {
    this._chartMaxResult = chartMaxResult;

    this._geonamesCall.then(this._updateCharts.bind(this));
  }

  private _updateCharts() {
    if (this._metric === 'ALL' || this._metric === 'population') {
      this._initChart('population');
    }

    if (this._metric === 'ALL' || this._metric === 'areaInSqKm') {
      this._initChart('areaInSqKm');
    }
  }

  private _filterData(data: GeonameModel[], continent: string): GeonameModel[] {
    return data
      .map(v => (continent === 'ALL' || v.continentName === continent) ? v : null)
      .filter(v => !!v);
  }

  sortColumn(name: string, target: HTMLSpanElement) {
    if (this._lastTarget !== target) {
      this.data = this.data.sort(this._sortBy(name));

      target.innerHTML = this._caret.up;
      if (this._lastTarget) {
        this._lastTarget.innerHTML = this._caret.center;
      }
      this._lastTarget = target;
    } else {
      this.data = this.data.reverse();

      target.innerHTML = target.innerHTML === this._caret.down
        ? this._caret.up
        : this._caret.down;
    }
  }

  private _sortBy<T>(field: string): (a: T, b: T) => number {
    return (a, b) => {
      const [v1, v2] = isNaN(a[field])
        ? [a[field], b[field]]
        : [+a[field], +b[field]];

      if (v1 < v2)
        return -1;
      if (v1 > v2)
        return 1;
      return 0;
    }
  }

  private _initChart(name: 'areaInSqKm' | 'population') {
    let data = this.data.slice().sort(this._sortBy(name)).reverse();

    let part1 = data.slice(0, +this._chartMaxResult);

    let result = part1.map(d => {
      return {name: d.countryName, y: +d[name]}
    });
    result.push({
      name: 'OTHER',
      y: +data.slice(+this._chartMaxResult).reduce((acc, row, index, arr) => `${+acc + +row[name]}`, "0")
    });

    $('#chart-' + name).highcharts({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: 'black'
            }
          }
        }
      },
      title: {
        text: name === 'population' ? 'Population' : 'Area in Square Kilometer'
      },
      series: [{
        name,
        colorByPoint: true,
        data: result
      }]
    });
  }

}
