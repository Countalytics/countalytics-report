import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit, AfterViewInit {

  ngOnInit() {

  }

  ngAfterViewInit() {
    let ctx2 = document.getElementById("walkChart");
    var walkChart = new Chart(ctx2, {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Initial Inventory Count',
          data: [41, 66, 49, 72, 61,41, 66, 49, 72, 61],
          backgroundColor: "#00b862"
        }, {
          label: 'Final Inventory Count',
          data: [21, 46, 39, 52, 41,11, 36, 29, 42, 21],
          backgroundColor: "#2196f3",
          type: 'bar'
        }, {
          label: 'Consumption %',
          data: [50,35,46,49,71,50,35,46,49,71],
          type: 'line',
          borderColor: '#ff5722',
          backgroundColor: 'rgba(255, 87, 34, 0.1)'

        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
        'Grey Goose',
        'Barcadi',
        'Dewars',
        'JD',
        'Woodford',
        'Bombay',
        'Avion',
        'Finlandia',
        'Baileys',
        'Canadian Club'
      ]
    },
    options: {
      title: {
        display: true,
        fontFamily:"Open Sans",
        text: "Wine consumption of all flights by brand ",
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
//
//   Data = [
//     { Date: "2016-06-14", Categories: [{ Name: "Category1", Value: 368 }, { Name: "Category2", Value: 321 }, { Name: "Category3", Value: 524 }], LineCategory: [{ Name: "Line1", Value: 69 }, { Name: "Line2", Value: 63 }] },
//     { Date: "2016-06-15", Categories: [{ Name: "Category1", Value: 521 }, { Name: "Category2", Value: 123 }, { Name: "Category3", Value: 653 }], LineCategory: [{ Name: "Line1", Value: 89 }, { Name: "Line2", Value: 96 }] },
//     { Date: "2016-06-17", Categories: [{ Name: "Category1", Value: 368 }, { Name: "Category2", Value: 236 }, { Name: "Category3", Value: 537 }], LineCategory: [{ Name: "Line1", Value: 63 }, { Name: "Line2", Value: 35 }] },
//     { Date: "2016-06-18", Categories: [{ Name: "Category1", Value: 423 }, { Name: "Category2", Value: 330 }, { Name: "Category3", Value: 689 }], LineCategory: [{ Name: "Line1", Value: 86 }, { Name: "Line2", Value: 45 }] },
//     { Date: "2016-06-19", Categories: [{ Name: "Category1", Value: 601 }, { Name: "Category2", Value: 423 }, { Name: "Category3", Value: 490 }], LineCategory: [{ Name: "Line1", Value: 65 }, { Name: "Line2", Value: 63 }] },
//     { Date: "2016-06-20", Categories: [{ Name: "Category1", Value: 412 }, { Name: "Category2", Value: 461 }, { Name: "Category3", Value: 321 }], LineCategory: [{ Name: "Line1", Value: 75 }, { Name: "Line2", Value: 85 }] }
//   ];
//
//   margin = { top: 20, right: 30, bottom: 60, left: 40 };
//   width = 0;
//   height = 0;
//
//   constructor() { }
//
//   ngOnInit() {
//
//   }
//
//   ngAfterViewInit() {
//     this.width = 800 - this.margin.left - this.margin.right;
//     this.height = 400 - this.margin.top - this.margin.bottom;
//
//     var Categories = new Array();
//
//     var ageNames;
//     let x0 = d3.scaleBand()
//     .rangeRound([0, this.width])
//     .padding(0.1);
//     let XLine = d3.scalePoint()
//     .range([0, this.width])
//     .padding(.1);
//     let x1 = d3.scaleLinear();
//
//     let y = d3.scaleLinear()
//     .range([this.height, 0]);
//
//     let YLine = d3.scaleLinear().range([this.height, 0])
//     .domain([0, d3.max(this.Data, (d) => { return d3.max(d.LineCategory, function (b) { return b.Value }) })]);
//
//     let color = d3.scaleBand()
//     .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
//
//     let line = d3.line().x((d) => {
//       return x0(d.Date) + x0.bandwidth() / 2;
//     }).y((d) => { return YLine(d.Value) });
//
//
//     let xAxis = d3.axisBottom()
//     .scale(x0);
//
//     let yAxis = d3.axisLeft()
//     .scale(y)
//     .tickFormat(d3.format(".2s"));
//
//     let YLeftAxis = d3.axisRight().scale(YLine).tickFormat(d3.format(".2s"));
//
//     let svg = d3.select("#canvas").append("svg")
//     .attr("width", this.width + this.margin.left + this.margin.right)
//     .attr("height", this.height + this.margin.top + this.margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
//
//
//     // Bar Data categories
//     this.Data.forEach((d) => {
//     d.Categories.forEach((b) => {
//       if (Categories.findIndex((c) => { return c.Name===b.Name}) == -1) {
//         b.Type = "bar";
//         console.log(JSON.stringify(b))
//         Categories.push(b)
//       }
//     })
//   });
//
//
//   // Line Data categories
//   this.Data.forEach((d) => {
//   d.LineCategory.forEach((b) => {
//     if (Categories.findIndex((c) => { return c.Name === b.Name }) == -1) {
//       b.Type = "line";
//       console.log(JSON.stringify(b))
//       Categories.push(b)
//     }
//   })
// });
//
// // Processing Line data
// let lineData = this.DataSegregator(this.Data.map((d) => { return d.LineCategory }), "Name");
//
// // Line Coloring
// let LineColor = d3.scaleBand();
// LineColor.domain(Categories.filter((d) => { return d.Type == "line" }).map((d) => { return d.Name }));
// LineColor.range(["#d40606", "#06bf00", "#98bdc5", "#671919", "#0b172b"])
// x0.domain(this.Data.map((d) => { return d.Date; }));
// XLine.domain(this.Data.map((d) => { return d.Date; }));
// x1.domain(Categories.filter((d) => { return d.Type == "bar" }).map((d) => { return d.Name})).rangeRound([0, x0.bandwidth()]);
// y.domain([0, d3.max(this.Data, (d) => { return d3.max(d.Categories, (d) => { return d.Value; }); })]);
//
// svg.append("g")
// .attr("class", "x axis")
// .attr("transform", "translate(0," + this.height + ")")
// .call(xAxis);
//
// svg.append("g")
// .attr("class", "y axis")
// .attr("transform", "translate(" + (this.width) + ",0)")
// .call(YLeftAxis)
//
// .append("text")
// .attr("transform", "rotate(-90)")
// .attr("y", -10)
//
// .attr("dy", ".71em")
// .style("text-anchor", "end")
// .text("Percent");
//
// svg.append("g")
// .attr("class", "y axis")
// .call(yAxis)
// .append("text")
// .attr("transform", "rotate(-90)")
// .attr("y", 6)
// .attr("dy", ".71em")
// .style("text-anchor", "end")
// .text("Population");
//
//
// var state = svg.selectAll(".state")
// .data(this.Data)
// .enter().append("g")
// .attr("class", "state")
// .attr("transform", (d) => { return "translate(" + x0(d.Date) + ",0)"; });
//
// state.selectAll("rect")
// .data((d) => { return d.Categories; })
// .enter().append("rect")
// .attr("width", x1.bandwidth)
// .attr("x", (d) => { return x1(d.Name); })
// .attr("y", (d) => { return y(d.Value); })
// //.attr("height", function (d) { return height - y(d.Value); })
// .style("fill", (d) => { return color(d.Name); })
// .transition().delay(500).attrTween("height", (d) => {
//   var i = d3.interpolate(0, this.height - y(d.Value));
//   return (t) =>
//   {
//     return i(t);
//   }
// });
//
// // drawing lines
// svg.selectAll(".lines").data(lineData).enter().append("g").attr("class", "line")
// .each((d) => {
//   console.log(d);
//   let Name=d[0].Name;
//   console.log(d3.select(this));
//   d3.select(this).append("path").attr("d", (b) => { console.log(line(b)); return line(b) }).style({ "stroke-width": "2px", "fill": "none" }).style("stroke", LineColor(Name)).transition().duration(1500);
// })
//
//
// // Legends
//
// var LegendHolder = svg.append("g").attr("class", "legendHolder");
// var legend = LegendHolder.selectAll(".legend")
// .data(Categories.map((d) => { return {"Name":d.Name,"Type":d.Type}}))
// .enter().append("g")
// .attr("class", "legend")
// .attr("transform", (d, i) => { return "translate(0," +( this.height+ this.margin.bottom/2 )+ ")"; })
// .each((d,i) => {
//   //  Legend Symbols
//
//
//   d3.select(this).append("rect")
//   .attr("width", function () { return 18 })
//   .attr("x", function (b) {
//
//     left = (i+1) * 15 + i * 18 + i * 5 + textWidthHolder;
//     return left;
//   })
//   .attr("y", (b) => { return b.Type == 'bar'?0:7})
//   .attr("height", (b) => { return b.Type== 'bar'? 18:5 })
//   .style("fill", (b) => { return b.Type == 'bar' ? color(d.Name) : LineColor(d.Name) });
//
//   //  Legend Text
//
//   d3.select(this).append("text")
//   .attr("x", (b) => {
//
//     left = (i+1) * 15 + (i+1) * 18 + (i + 1) * 5 + textWidthHolder;
//
//     return left;
//   })
//   .attr("y", 9)
//   .attr("dy", ".35em")
//   .style("text-anchor", "start")
//   .text(d.Name);
//
//   textWidthHolder += this.getTextWidth(d.Name, "10px", "Open Sans");
// });
//
//
// // Legend Placing
//
// d3.select(".legendHolder").attr("transform", (d) => {
//   thisWidth = d3.select(this).node().getBBox().width;
//   return "translate(" + ((width) / 2 - thisWidth / 2) + ",0)";
// })
//
// }
//
// getTextWidth(text, fontSize, fontName) {
//   c = document.findElementById("canvas");
//   ctx = c.getContext("2d");
//   ctx.font = fontSize + ' ' + fontName;
//   return ctx.measureText(text).width;
// }
//
// DataSegregator(array, on) {
//   console.log(array, on);
//   var SegData;
//
//   let OrdinalPositionHolder = {
//     valueOf: () => {
//       let thisObject = this;
//       let keys = Object.keys(thisObject);
//       keys.splice(keys.indexOf("valueOf"), 1);
//       keys.splice(keys.indexOf("keys"), 1);
//       return keys.length == 0 ? -1 : d3.max(keys, (d) => { return thisObject[d] })
//     }
//     , keys: () => {
//       let thisObject = this;
//       let keys = Object.keys(thisObject);
//       keys.splice(keys.indexOf("valueOf"), 1);
//       keys.splice(keys.indexOf("keys"), 1);
//       return keys;
//     }
//   };
//
//   array[0].map((d) => { return d[on] }).forEach((b) => {
//     let value = OrdinalPositionHolder.valueOf();
//     OrdinalPositionHolder[b] = OrdinalPositionHolder > -1 ? ++value : 0;
//   })
//
//   SegData = OrdinalPositionHolder.keys().map(() => {
//     return [];
//   });
//
//   array.forEach((d) => {
//     d.forEach((b) => {
//       SegData[OrdinalPositionHolder[b[on]]].push(b);
//     })
//   });
//
//   return SegData;
// }



}
