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

  private allRecords: TempRecord[];

  @Input()
  set temperatureData(value: TempRecord[]) {
    this.changeData(value);
  }


  lineChartData: ChartDataSets[];
  lineChartOptions: ChartOptions;
  lineChartColors: Color[];
  startDate: Date;
  endDate: Date;
  minDate: Date;
  maxDate: Date;


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

  dateChange(): void {
    if (!this.startDate || !this.endDate)
      return;

    let adjustedEnd = new Date(this.endDate.getTime() + (24 * 60 * 60 * 1000));
    adjustedEnd.setHours(0, 0, 0, 0);

    let start = this.startDate.getTime();
    let end = adjustedEnd.getTime();
    this.lineChartData[0].data = this.allRecords
      .filter(singleRecord =>
        singleRecord.date.getTime() >= start
        && singleRecord.date.getTime() < end)
      .map<ChartPoint>(x => ({
        t: x.date,
        y: x.tempF
      }));
  }

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
    this.allRecords = value;

    if (value) {
      let min = Number.MAX_VALUE;
      let max = Number.MIN_VALUE;
      value.forEach(singleRecord => {
        if (singleRecord.date.getTime() < min)
          min = singleRecord.date.getTime();
        if (singleRecord.date.getTime() > max)
          max = singleRecord.date.getTime();
      });

      this.startDate = new Date(min);
      this.minDate = new Date(min);
      this.endDate = new Date(max);
      this.maxDate = new Date(max);


      let daysPerPixel = 12 / 411;
      let daysToShow = Math.round(daysPerPixel * window.innerWidth);
      let maxToShow = Date.now() - (daysToShow * 24 * 60 * 60 * 1000);
      if (maxToShow > this.minDate.getTime()) {
        this.startDate = new Date(maxToShow);
        this.startDate.setHours(0, 0, 0, 0);
      }

      this.dateChange();
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
