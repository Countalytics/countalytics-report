import { Component, OnInit } from '@angular/core';
import { ConsumptionService } from '../consumption.service';


@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.scss']
})
export class ConsumptionComponent implements OnInit {
  deptChoices = [];
  arrChoices = [];
  flightNumChoices = [];
  flightCount;
  initialCount;
  finalCount;
  consumption;
  dept;
  arr;
  flightNum;

  constructor(private cservice: ConsumptionService) { }

  ngOnInit() {

    this.cservice.getDeptTypes().subscribe((data) => {
      console.log(Array.from(data.keys()));
      this.deptChoices = Array.from(data.keys());
    });

    this.cservice.getArrTypes().subscribe((data) => {
      console.log(Array.from(data.keys()));
      this.arrChoices = Array.from(data.keys());
    });

    this.cservice.getFlightNumTypes().subscribe((data) => {
      console.log(Array.from(data.keys()));
      this.flightNumChoices = Array.from(data.keys());
    });

    this.cservice.getOverviewFigures().subscribe((data) => {
      this.flightCount = data["flightNum"];
      this.initialCount = data["initialCount"];
      this.finalCount = data["finalCount"];
      this.consumption = data["consumption"];
    });

  }

}
