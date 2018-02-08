import { Component, OnInit, AfterViewInit, OnChanges, Input } from '@angular/core';
import {Chart} from 'chart.js';
import { ConsumptionService } from '../../consumption.service';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() filters;

  canvas: any;
  ctx: any;
  barChart: any;

  itemList = ["Avion", "Bacardi", "Bailey's", "Bombay", "Canadian Club",
  "Courvoisier", "Dewars", "Finlandia", "Grey Goose", "JD - Single Barrel",
  "JD - Honey", "JD", "Macallan", "Woodford"];

  initialList = [];
  finalList = [];
  consumptionList = [];

  constructor(private cservice: ConsumptionService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.cservice.getItemCount(this.filters).subscribe((data) => {
      for (let item of this.itemList) {
          this.initialList.push(data[item]["initial"]);
          this.finalList.push(data[item]["final"]);
          this.consumptionList.push(data[item]["consumption"]);
      }
      this.canvas = document.getElementById('walkChart');
      this.ctx = this.canvas.getContext('2d');
      this.renderChart();
    });
  }

  ngOnChanges() {
    this.cservice.getItemCount(this.filters).subscribe((data) => {
      this.initialList = [];
      this.finalList = [];
      this.consumptionList = [];
      for (let item of this.itemList) {
          this.initialList.push(data[item]["initial"]);
          this.finalList.push(data[item]["final"]);
          this.consumptionList.push(data[item]["consumption"]);
      }
      if (this.barChart) {
          this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
          this.ctx.beginPath();
          console.log(this.consumptionList);
          this.renderChart();
      }
    });
  }

  renderChart() {
    let date = (this.filters.date) ? this.filters.date : "all dates";
    let dept = (this.filters.dept) ? this.filters.dept : "ALL";
    let arr = (this.filters.arr) ? this.filters.arr : "ALL";
    let flightNum = (this.filters.flightNum) ? " / " + this.filters.flightNum : "";
    this.barChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Initial Inventory Count',
          data: this.initialList,
          backgroundColor: "#00b862"
        }, {
          label: 'Final Inventory Count',
          data: this.finalList,
          backgroundColor: "#2196f3",
          type: 'bar'
        }, {
          label: 'Consumption',
          data: this.consumptionList,
          type: 'line',
          borderColor: '#ff5722',
          backgroundColor: 'rgba(255, 87, 34, 0.1)'

        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: this.itemList
    },
    options: {
      title: {
        display: true,
        fontFamily:"Open Sans",
        text: `Alcohol consumption of ${date}, ${dept} -> ${arr}${flightNum} flight(s) by brand`,
        fontStyle: "normal",
        fontSize: "14"
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          // This more specific font property overrides the global property
          fontFamily:"Open Sans"
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'Inventory Count',
            //fontColor: "#664D9E"
          }
        }]
      }
    }
  });
}
}
