import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

import { GeonameModel } from "./geoname.model"

import { Observable } from "rxjs/Rx";

@Injectable()
export class GeonamesService {
  private _showAlert: boolean = false;
  private _apiUrl = "http://api.geonames.org/countryInfoJSON?username=hydrane";
  private _cache: GeonameModel[] = null;

  constructor(private _http: Http) {
    if (window.location.protocol === 'https:') {
      this._showAlert = !window.localStorage.getItem('showAlert')
    }
  }

  get(): Observable<GeonameModel[]> {
    if (this._showAlert) {
      alert("Your browser may not support some scripts. Please, click on the shield in your address bar, and let us load scripts.");
      window.localStorage.setItem('showAlert', 'true');
      this._showAlert = false;
    }

    if (this._cache) {
      return Observable.of(this._cache);
    }

    return this._http.get(this._apiUrl).map(data => {
      return data.status == 200 ? this._cache = data.json()["geonames"] : null;
    });
  }
}
