import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import { ConsumptionService } from '../consumption.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  itemList = ["Avion", "Bacardi", "Bailey's", "Bombay", "Canadian Club",
  "Courvoisier", "Dewars", "Finlandia", "Grey Goose", "JD - Single Barrel",
  "JD - Honey", "JD", "Macallan", "Woodford"];
  colors = ['#647c8a', '#3f51b5', '#2196f3', '#00b862', '#afdf0a', '#a7b61a',
  '#f3e562', '#ff9800', '#ff5722', '#ff4514','#bf9d76', '#e99450', '#d89f59', '#f2dfa7', '#a5d7c6'];
  brandTable = [];
  percentList = [];
  topInitialList = [];
  topFinalList = [];
  topConsumptionList = [];
  topLabelList = [];
  bottomInitialList = [];
  bottomFinalList = [];
  bottomConsumptionList = [];
  bottomLabelList = [];

  constructor(private cservice: ConsumptionService) { }

  ngOnInit() {
    this.cservice.getItemCount().subscribe((data) => {
      let total = 0;
      for (let item of this.itemList) {
        total += data[item]["consumption"];
      }
      for (let i=0; i<this.itemList.length; i++) {
        let item = this.itemList[i];
        let percent = (data[item]["consumption"] / total * 100).toFixed(1);
        data[item]["percent"] = percent;
        data[item]["color"] = this.colors[i];
        this.brandTable.push(data[item]);
        this.percentList.push(data[item]["consumption"]);
      }
      this.brandTable.sort((a,b) => {
        return b["percent"] - a["percent"];
      });
      this.renderPieChart();
    });

    this.cservice.getTopFlights().subscribe((data) => {
      for (let row of data) {
        this.topInitialList.push(row["Initial"]);
        this.topFinalList.push(row["Final"]);
        this.topConsumptionList.push(row["Totals"]);
        this.topLabelList.push(row["Flt #"] + ": " + row["Arvl"] + "->" + row["Dept"]);
      }
      this.renderTopChart();
    });
    this.cservice.getBottomFlights().subscribe((data) => {
      console.log(data);
      for (let row of data) {
        this.bottomInitialList.push(row["Initial"]);
        this.bottomFinalList.push(row["Final"]);
        this.bottomConsumptionList.push(row["Totals"]);
        this.bottomLabelList.push(row["Flt #"] + ": " + row["Arvl"] + "->" + row["Dept"]);
      }
      this.renderBottomChart();
    });
  }

  renderPieChart() {
    let ctx = document.getElementById("pieChart");
    let myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [{
          data: this.percentList,
          backgroundColor: this.colors
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: this.itemList
      },
      options: {
        legend: {
          display: false,
          position: 'right',
          labels: {
            // This more specific font property overrides the global property
            fontFamily:"Open Sans"
          }
        },
      }
    });
  }

  renderTopChart() {
    let ctx = document.getElementById("top10Chart");
    let walkChart = new Chart(ctx, {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Initial Inventory Count',
          data: this.topInitialList,
          backgroundColor: "#00b862"
        }, {
          label: 'Final Inventory Count',
          data: this.topFinalList,
          backgroundColor: "#2196f3",
          type: 'bar'
        }, {
          label: 'Consumption',
          data: this.topConsumptionList,
          type: 'line',
          borderColor: '#ff5722',
          backgroundColor: 'rgba(255, 87, 34, 0.1)'

        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: this.topLabelList
      },
      options: {
        title: {
          display: true,
          fontFamily:"Open Sans",
          text: "Alcohol consumption of top 10 flights",
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


  renderBottomChart() {
    let ctx = document.getElementById("bottom10Chart");
    let walkChart = new Chart(ctx, {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Initial Inventory Count',
          data: this.bottomInitialList,
          backgroundColor: "#00b862"
        }, {
          label: 'Final Inventory Count',
          data: this.bottomFinalList,
          backgroundColor: "#2196f3",
          type: 'bar'
        }, {
          label: 'Consumption',
          data: this.bottomConsumptionList,
          type: 'line',
          borderColor: '#ff5722',
          backgroundColor: 'rgba(255, 87, 34, 0.1)'

        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: this.bottomLabelList
      },
      options: {
        title: {
          display: true,
          fontFamily:"Open Sans",
          text: "Alcohol consumption of bottom 10 flights",
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
