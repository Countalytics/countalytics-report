import { Component, OnInit } from '@angular/core';
import { ConsumptionService } from '../../consumption.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  flights = [];

  constructor(private cservice: ConsumptionService) { }

  ngOnInit() {
    // this.cservice.getRawData().subscribe((data) => {
    //   this.flights = data;
    // });

    this.cservice.getConsumptionData().subscribe((data) => {
      this.flights = data;
    });
  }

}
