import { Component, OnInit, Input } from '@angular/core';

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
export class SearchResultComponent implements OnInit {
  private _geonamesCall: Promise<GeonameModel[]>;
  private _populationChart;
  private _lastTarget: HTMLSpanElement = null;
  private _carret = {
    up: '▴',
    down: '▾',
    center: '◂'
  };

  data: GeonameModel[] = null;

  constructor(private _geonames: GeonamesService) {
    this._geonamesCall = this._geonames.get().toPromise();
  }

  ngOnInit() {
  }

  @Input() set continent(continent: string) {
    this._geonamesCall.then(data => {
      this.data = this._filterData(data, continent);
    });
  }

  private _metric: string;
  @Input() set metric(metric: string) {
    this._metric = metric;

    this._geonamesCall.then(data => {
      if (this._metric === 'ALL' || this._metric === 'population') {
        this._initPopulationChart();
      }

      if (this._metric === 'ALL' || this._metric === 'areaInSqKm') {
        this._initAreaInSqKmChart();
      }
    });
  }

  private _chartMaxResult: string;
  @Input() set chartMaxResult(chartMaxResult: string) {
    this._chartMaxResult = chartMaxResult;
    this._geonamesCall.then(data => {
      if (this._metric === 'ALL' || this._metric === 'population') {
        this._initPopulationChart();
      }

      if (this._metric === 'ALL' || this._metric === 'areaInSqKm') {
        this._initAreaInSqKmChart();
      }
    });
  }

  private _filterData(data: GeonameModel[], continent: string): GeonameModel[] {
    return data.map(value => {
      if (continent === 'ALL' || value.continentName === continent) return value;

      return null;
    }).filter(x => x !== null);
  }

  sortColumn(name: string, target: HTMLSpanElement) {
    if (this._lastTarget !== target) {
      this.data = this.data.sort((a, b) => {
        if (!isNaN(a[name])) {
          if (a[name] < b[name])
            return -1;
          if (a[name] > b[name])
            return 1;
          return 0;
        } else {
          if (+a[name] < +b[name])
            return -1;
          if (+a[name] > +b[name])
            return 1;
          return 0;
        }
      });

      target.innerHTML = this._carret.up;
      if (this._lastTarget) {
        this._lastTarget.innerHTML = this._carret.center;
      }
      this._lastTarget = target;
    } else {
      this.data = this.data.reverse();

      target.innerHTML = target.innerHTML === this._carret.down
        ? this._carret.up
        : this._carret.down;
    }
  }

  private _initPopulationChart() {
    let data = this.data.slice().sort((a, b) => {
      if (+a.population > +b.population)
        return -1;
      if (+a.population < +b.population)
        return 1;
      return 0;
    });
    let part1 = data.slice(0, +this._chartMaxResult);
    let result = part1.map(d => {
        return {name: d.countryName, y: +d.population}
    });
    result.push({
      name: 'OTHER',
      y: +data.slice(+this._chartMaxResult).reduce((acc, row, index, arr) => `${+acc + +row.population}`, "0")
    });

    this._populationChart = $('#chart-population').highcharts({
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
        text: 'Population'
      },
      series: [{
        name: 'Country',
        colorByPoint: true,
        data: result
      }]
    });
  }

  private _initAreaInSqKmChart() {
    let data = this.data.slice().sort((a, b) => {
      if (+a.areaInSqKm > +b.areaInSqKm)
        return -1;
      if (+a.areaInSqKm < +b.areaInSqKm)
        return 1;
      return 0;
    });
    let part1 = data.slice(0, +this._chartMaxResult);
    let result = part1.map(d => {
      return {name: d.countryName, y: +d.areaInSqKm}
    });
    result.push({
      name: 'OTHER',
      y: +data.slice(+this._chartMaxResult).reduce((acc, row, index, arr) => `${+acc + +row.areaInSqKm}`, "0")
    });

    this._populationChart = $('#chart-areaInSqKm').highcharts({
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
        text: 'Area in Square Kilometer'
      },
      series: [{
        name: 'Country',
        colorByPoint: true,
        data: result
      }]
    });
  }
}
