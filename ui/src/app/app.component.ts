import { Component, OnInit } from '@angular/core';
import { AppVersion } from './app-version';
import { TempRecord } from './model/temp-record';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  AppVersion = AppVersion;
  currentRecord: TempRecord;
  tempRecords: TempRecord[];

  constructor(private dataService: DataService) { }

  async ngOnInit(): Promise<void> {
    this.tempRecords = await this.dataService.getTemperatureData();
    this.currentRecord = this.tempRecords[0];
  }



}
