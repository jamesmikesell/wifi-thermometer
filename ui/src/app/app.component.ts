import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppVersion } from './app-version';
import { TempRecord } from './model/temp-record';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  AppVersion = AppVersion;
  currentRecord: TempRecord;
  tempRecords: TempRecord[];

  private dataSubscription: Subscription;

  constructor(private dataService: DataService) { }

  async ngOnInit(): Promise<void> {
    this.dataSubscription = this.dataService.recordSubscription
      .subscribe(items => {
        this.tempRecords = items;
        if (items && items.length)
          this.currentRecord = this.tempRecords[0];
        else
          this.currentRecord = undefined;
      });
  }

  ngOnDestroy(): void {
    if (this.dataSubscription || !this.dataSubscription.closed)
      this.dataSubscription.unsubscribe();
  }


}
