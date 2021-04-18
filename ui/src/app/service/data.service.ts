import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TempRecord } from '../model/temp-record';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  readonly recordSubscription = new BehaviorSubject<TempRecord[]>(undefined);

  constructor(private http: HttpClient) {
    this.getTemperatureData();

    // Using setInterval as setTimeout has problems when used on inactive tabs
    setInterval(() => {
      let records = this.recordSubscription.value;
      if (!records
        || !records[0]
        || Date.now() - records[0].date.getTime() > 60 * 60 * 1000) {
        this.getTemperatureData();
      }
    }, 30 * 1000);
  }

  private async getTemperatureData(): Promise<void> {
    let sheetData = await this.getGoogleSheetData();
    let records = this.convertSheetDataToRecord(sheetData);
    this.recordSubscription.next(records);
  }

  private getGoogleSheetData(): Promise<GoogleSheet> {
    return this.http
      .get<GoogleSheet>("https://spreadsheets.google.com/feeds/cells/19EeNlkYdQqr8EXXHsszUXIYHZpZFaH-P_BccS7rEWCs/1/public/full?alt=json")
      .toPromise();
  }

  private convertSheetDataToRecord(sheetData: GoogleSheet): TempRecord[] {
    let dateRegEx = /\d+\/\d+\/\d+ \d+\:\d+\:\d+/g;

    let startRow = 2;
    let data: TempRecord[] = [];
    sheetData.feed.entry
      .map(x => x.gs$cell)
      .forEach(cell => {
        if (+cell.row >= startRow) {

          let record: TempRecord;
          if (!data[+cell.row - startRow]) {
            record = new TempRecord();
            data[+cell.row - startRow] = record;
          } else {
            record = data[+cell.row - startRow];
          }


          if (dateRegEx.test(cell.inputValue)) {
            // magic_number = new Date((44300.92016686343 * 24 * 60 * 60 * 1000) - (new Date("4/14/2021 22:05:02.417 GMT-0400"))).getTime()
            record.date = new Date((+cell.numericValue * 24 * 60 * 60 * 1000) - 2209147200000);
          }

          if (+cell.col === 3) {
            record.tempF = +cell.numericValue;
          }

        }
      });

    data.sort((a, b) => b.date.getTime() - a.date.getTime());

    return data;
  }
}



interface GoogleSheet {
  feed: {
    entry: {
      gs$cell: SheetCell;
    }[];
  };
}


interface SheetCell {
  row: string;
  col: string;
  inputValue: string;
  numericValue?: string;
  $t: string;
}
