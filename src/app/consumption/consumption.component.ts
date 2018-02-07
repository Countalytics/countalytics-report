import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
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

  constructor(private cservice: ConsumptionService) { }

  ngOnInit() {
    const rawdata = this.cservice.getRawData();
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
  }

}
