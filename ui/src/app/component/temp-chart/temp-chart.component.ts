import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartPoint } from 'chart.js';
import { Color, ThemeService } from 'ng2-charts';
import { TempRecord } from 'src/app/model/temp-record';

@Component({
  selector: 'app-temp-chart',
  templateUrl: './temp-chart.component.html',
  styleUrls: ['./temp-chart.component.scss']
})
export class TempChartComponent implements OnInit {

  @Input()
  set temperatureData(value: TempRecord[]) {
    this.changeData(value);
  }

  lineChartData: ChartDataSets[];
  lineChartOptions: ChartOptions;
  lineChartColors: Color[];


  constructor(themeService: ThemeService) {
    let overrides: ChartOptions = {
      legend: {
        labels: { fontColor: 'white' }
      },
      scales: {
        xAxes: [{
          ticks: { fontColor: 'white' },
          gridLines: { color: 'rgba(255,255,255,0.1)' }
        }],
        yAxes: [{
          ticks: { fontColor: 'white' },
          gridLines: { color: 'rgba(255,255,255,0.1)' }
        }]
      }
    };
    themeService.setColorschemesOptions(overrides);

    this.configureLineColors();
    this.configureOptions();
    this.configureDataSets();
  }

  ngOnInit(): void { }


  private configureDataSets(): void {
    this.lineChartData = [
      {
        data: [],
        label: 'Temp (°F)',
        borderWidth: 1.5,
      },
    ];
  }

  private changeData(value: TempRecord[]): void {
    this.lineChartData[0].data = [];

    if (value) {
      this.lineChartData[0].data = value.map<ChartPoint>(x => ({
        t: x.date,
        y: x.tempF
      }));
    }
  }

  private configureOptions(): void {
    this.lineChartOptions = {
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
        yAxes: [{}],
        xAxes: [{
          type: 'time',
          time: {
            minUnit: 'day'
          }
        }]
      }
    };
  }

  private configureLineColors(): void {
    this.lineChartColors = [
      {
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];
  }

}
