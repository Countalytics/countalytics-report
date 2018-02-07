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
  brandTable = [];
  percentList = [];

  constructor(private cservice: ConsumptionService) { }

  ngOnInit() {
    this.cservice.getItemCount().subscribe((data) => {
      let total = 0;
      for (let item of this.itemList) {
        total += data[item]["consumption"];
      }
      for (let item of this.itemList) {
        let percent = (data[item]["consumption"] / total * 100).toFixed(1);
        data[item]["percent"] = percent;
        this.brandTable.push(data[item]);
        this.percentList.push(data[item]["consumption"]);
      }
      console.log(this.percentList);
      this.brandTable.sort((a,b) => {
        return b["percent"] - a["percent"];
      });
      this.renderChart();
    });
  }

  renderChart() {
    let ctx = document.getElementById("pieChart");
    let myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
    datasets: [{
        data: this.percentList,
        backgroundColor: ['#647c8a', '#3f51b5', '#2196f3', '#00b862', '#afdf0a', '#a7b61a',
        '#f3e562', '#ff9800', '#ff5722', '#ff4514','#A10A28','#D3342D', '#EF6D49', '#FAAD67', '#FDDE90']
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: this.itemList
  },
      options: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            // This more specific font property overrides the global property
            fontFamily:"Open Sans"
          }
        },
      }
    });
  }

}
