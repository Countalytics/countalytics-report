import { Injectable } from '@angular/core';
import { PapaParseService } from 'ngx-papaparse';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ConsumptionService {
  attrList = ["Employee #", "Flight Count", "Flt #", "Date", "Dept", "Arvl", "Dept Time", "Arrv Time"];
  itemsList = ["Avion", "Bacardi", "Bailey's", "Bombay", "Canadian Club",
  "Courvoisier", "Dewars", "Finlandia", "Grey Goose", "JD - Single Barrel",
  "JD - Honey", "JD", "Macallan", "Woodford"];


  constructor (private http: Http, private papa: PapaParseService) {}

  public getData(): Observable<any> {
    return this.http.get("./assets/consumption.json");
  }

  public getAirportData(): Observable<any> {
    return this.http.get("./assets/airports.json");
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

  getFlightDates() {
    return this.getData().map(data => {
      let flightDates = new Set([]);
      for (let row of data.json()) {
        flightDates.add(row["Date"]);
      }
      return flightDates;
    });
  }

  getOverviewFigures(filters) {
    return this.getData().map(data => {
      let rows = this.filterData(filters, data.json());
      let dataObj = {};

      let flights = new Set([]);
      for (let row of rows) {
        flights.add(row["Flt #"]);
      }
      dataObj["flightNum"] = flights.size;

      let initialCount = 0;
      for (let i=0; i<rows.length; i+=2) {
        initialCount += rows[i]["Totals"];
      }
      dataObj["initialCount"] = initialCount;

      let finalCount = 0;
      for (let i=0; i<rows.length; i+=2) {
        finalCount += rows[i+1]["Totals"];
      }
      dataObj["finalCount"] = finalCount;
      dataObj["consumption"] = this.calcConsumption(initialCount, finalCount);
      return dataObj;

    });
  }

  getItemCount(filters) {
    return this.getData().map(data => {
      let rows = this.filterData(filters, data.json());
      let itemCountObj = {};
      for (let item of this.itemsList) {
        let itemObj = {};
        itemObj["item"] = item;
        itemObj["initial"] = 0;
        itemObj["final"] = 0;
        itemObj["consumption"] = 0;
        for (let i=0; i<rows.length; i+=2) {
          itemObj["initial"] += rows[i][item];
          itemObj["final"] += rows[i+1][item];
          itemObj["consumption"] += (rows[i][item] - rows[i+1][item]);
        }
        itemCountObj[item] = itemObj;
      }
      return itemCountObj;
    });
  }

  getConsumptionData(filters) {
    return this.getData().map(data => {
      let filtered = this.filterData(filters, data.json());
      return this.squashConsumption(filtered);
    });
  }

  getTopFlights() {
    return this.getData().map(data => {
      let consumptionData = this.squashConsumption(data.json());
      consumptionData.sort((a,b) => {
        return b["Totals"] - a["Totals"];
      });
      return consumptionData.slice(0,10);
    });
  }

  getBottomFlights() {
    return this.getData().map(data => {
      let consumptionData = this.squashConsumption(data.json());
      consumptionData.sort((a,b) => {
        return a["Totals"] - b["Totals"];
      });
      return consumptionData.slice(0,10);
    });
  }

  getFlightConnection(filters) {
    console.log(filters);
    return this.getData().map(data => {
      let filtered = this.filterData(filters, data.json());
      let consumptionData = this.squashConsumption(filtered);
      return consumptionData;
    });
  }

  filterData(filters, data) {
    let filtered = data.filter((row) => {
      let isFlightNum = (filters.flightNum) ? (filters.flightNum === row["Flt #"]) : true;
      let isDate = (filters.date) ? (filters.date === row["Date"]) : true;
      let isArr = (filters.arr) ? (filters.arr === row["Arvl"]) : true;
      let isDept = (filters.dept) ? (filters.dept === row["Dept"]) : true;
      if (isFlightNum && isDate && isArr && isDept) {
        return row;
      }
    });
    return filtered;
  }
  //
  // getFlightConnection() {
  //   return this.getData().map(data => {
  //     let consumptionData = this.squashConsumption(data);
  //     this.getAirportData().subscribe((res) => {
  //       this.papa.parse(res.text(), {
  //           complete: (results, file) => {
  //               let airport =
  //               for (let row of consumptionData) {
  //                 console.log(row);
  //                 row["latitude"]
  //               }
  //           }, header: true});
  //     });
  //   });
  // }

  calcConsumption(initial, final) {
    return ((1 - final / initial) * 100).toFixed(1);
  }

  squashConsumption(rows) {
    let consData = [];
    for (let i=0; i<rows.length; i+=2) { // assuming that list is in order (data point 1,2 consecutively)
      let consObj = {};

      // get flight details
      for (let attr of this.attrList) {
        consObj[attr] = rows[i][attr];
      }
      // get initial and final count, % consumption
      consObj["Initial"] = rows[i]["Totals"];
      consObj["Final"] = rows[i+1]["Totals"];
      consObj["Totals"] = consObj["Initial"] - consObj["Final"];
      consObj["Consumption"] = this.calcConsumption(consObj["Initial"], consObj["Final"]);

      // get consumption of items
      for (let item of this.itemsList) {
        consObj[item] = +rows[i][item] - +rows[i+1][item];
      }

      consData.push(consObj);
    }
    return consData;
  }

}
