import { Injectable } from '@angular/core';
import { PapaParseService } from 'ngx-papaparse';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ConsumptionService {

  constructor (private http: Http, private papa: PapaParseService) {}

  public getData(): Observable<any> {
    return this.http.get("./assets/consumption.json");
  }

  getRawData() {
    return this.getData().map(data => {
      return data.json();
    });
  }

  getDeptTypes() {
    return this.getData().map(data => {
      let deptTypes = new Set([]);
      for (let row of data.json()) {
        deptTypes.add(row["Dept"]);
      }
      return deptTypes;
    });
  }

  getArrTypes() {
    return this.getData().map(data => {
      let arrTypes = new Set([]);
      for (let row of data.json()) {
        arrTypes.add(row["Arvl"]);
      }
      return arrTypes;
    });
  }

  getFlightNumTypes() {
    return this.getData().map(data => {
      let flightNumTypes = new Set([]);
      for (let row of data.json()) {
        flightNumTypes.add(row["Flt #"]);
      }
      return flightNumTypes;
    });
  }

}
