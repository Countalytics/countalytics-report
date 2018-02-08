import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ConsumptionService } from '../../consumption.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() filters;

  flights = [];

  constructor(private cservice: ConsumptionService) { }

  ngOnInit() {
    this.updateTable();
  }

  ngOnChanges() {
    this.updateTable();
  }

  updateTable() {
    this.cservice.getConsumptionData(this.filters).subscribe((data) => {
      this.flights = data;
    });
  }

}
