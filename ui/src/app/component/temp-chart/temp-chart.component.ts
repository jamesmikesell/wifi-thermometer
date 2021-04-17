import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartPoint, ChartType } from 'chart.js';
import { Color } from 'ng2-charts';
import { TempRecord } from 'src/app/model/temp-record';

@Component({
  selector: 'app-temp-chart',
  templateUrl: './temp-chart.component.html',
  styleUrls: ['./temp-chart.component.scss']
})
export class TempChartComponent implements OnInit {


  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Temperature (°F)', borderWidth: 1.5 },
  ];


  @Input()
  set temperatureData(value: TempRecord[]) {
    this.lineChartData[0].data = [];

    if (value) {
      this.lineChartData[0].data = value.map<ChartPoint>(x => ({
        t: x.date,
        y: x.tempF
      }));
    }
  }




  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 1.5
      }
    },
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          minUnit: 'day'
        }
      }]
    }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';





  constructor() { }

  ngOnInit(): void {
  }

}
