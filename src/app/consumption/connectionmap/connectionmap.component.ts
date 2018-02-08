import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ConsumptionService } from '../../consumption.service';
// import { PlotlyStatic } from '@types/plotly.js';
declare var Plotly: any;

@Component({
  selector: 'app-connectionmap',
  templateUrl: './connectionmap.component.html',
  styleUrls: ['./connectionmap.component.scss']
})
export class ConnectionmapComponent implements OnInit, OnChanges {
  flightPairData;
  @Input() filters;

  constructor(private cservice: ConsumptionService) { }

  ngOnInit() {
    this.getFlightData();
  }

  ngOnChanges() {
    this.getFlightData();
  }

  getFlightData() {
    this.cservice.getFlightConnection(this.filters).subscribe((consumptionData) => {
      this.cservice.getAirportData().subscribe((airportJSON) => {
        let airports = airportJSON.json();
        let airportDict = {};
        for (let airport of airports) {
          airportDict[airport["locationID"]] = airport;
        }

        for (let flight of consumptionData) {
          flight["start_lat"] = airportDict[flight["Dept"]]["Latitude"];
          flight["start_lon"] = airportDict[flight["Dept"]]["Longitude"];
          flight["end_lat"] = airportDict[flight["Arvl"]]["Latitude"];
          flight["end_lon"] = airportDict[flight["Arvl"]]["Longitude"];
          flight["cnt"] = 1;
        }
        // find flight pairs set, get average consumption (sum(%) / data points)

        this.renderMap(consumptionData);
      });
    });
  }

  renderMap(consumptionData) {
    let data = [];
    let count = this.unpack(consumptionData, 'cnt');
    let startLongitude = this.unpack(consumptionData, 'start_lon');
    let endLongitude = this.unpack(consumptionData, 'end_lon');
    let startLat = this.unpack(consumptionData, 'start_lat');
    let endLat = this.unpack(consumptionData, 'end_lat');
    let origin = this.unpack(consumptionData, 'Dept');
    let destination = this.unpack(consumptionData, 'Arvl');
    let consumption = this.unpack(consumptionData, 'Consumption');

    for ( let i = 0 ; i < count.length; i++ ) {
      let opacityValue = consumptionData[i]/this.getMaxOfArray(consumptionData);
      let color = (consumption[i] > 75) ? '#E71D36' : '#32DE8A'; // set threshold for low and high consumption
      let result2 = {
      type: 'scattergeo',
      //locationmode: "ISO-3",
      lon: [-startLongitude[i], -endLongitude[i]],
      lat: [startLat[i] , endLat[i]],
      mode: 'lines+text',
      text: [origin[i], destination[i]],
      line: {
        width: 2,
        color: color,
        dash: 'dot'
      },
      name: `${consumptionData[i]["Flt #"]} : ${consumptionData[i]["Dept"]} -> ${consumptionData[i]["Arvl"]}`
      //opacity: 1//opacityValue
    }
    data.push(result2);
  }

  let layout = {
    showlegend: true,
    legend: {

    },
    geo:{
      scope: 'usa',
      projection: {
        type: 'albers usa'
      },
      showland: true,
      landcolor: "rgb(250, 250, 250)",
      subunitcolor: "rgb(217, 217, 217)",
      countrycolor: 'rgb(217, 217, 217)'
    },
    height: 400,
    width: 900,
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0,
      pad: 0
    },
    yaxis: {autorange: true},
    xaxis : {autorange: true}
  };
  let ctx = document.getElementById("myDiv");
  Plotly.newPlot(ctx, data, layout, {showLink: false, displayModeBar: false, scrollZoom: false});

}

unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}

getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

}
