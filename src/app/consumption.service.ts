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

  getOverviewFigures() {
    return this.getData().map(data => {
      let rows = data.json();
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

  getItemCount() {
    return this.getData().map(data => {
      let rows = data.json();
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
      console.log(itemCountObj);
      return itemCountObj;
    });
  }

  getConsumptionData() {
    return this.getData().map(data => {
      return this.squashConsumption(data);
    });
  }

  getTopFlights() {
    return this.getData().map(data => {
      let consumptionData = this.squashConsumption(data);
      console.log(consumptionData);
      consumptionData.sort((a,b) => {
        return b["Totals"] - a["Totals"];
      });
      return consumptionData.slice(0,10);
    });
  }

  getBottomFlights() {
    return this.getData().map(data => {
      let consumptionData = this.squashConsumption(data);
      console.log(consumptionData);
      consumptionData.sort((a,b) => {
        return a["Totals"] - b["Totals"];
      });
      return consumptionData.slice(0,10);
    });
  }

  calcConsumption(initial, final) {
    return ((1 - final / initial) * 100).toFixed(1);
  }

  squashConsumption(data) {
    let consData = [];
    let rows = data.json();
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
