import { Component, Input, OnInit } from '@angular/core';
import { TempRecord } from 'src/app/model/temp-record';

@Component({
  selector: 'app-current-temp',
  templateUrl: './current-temp.component.html',
  styleUrls: ['./current-temp.component.scss']
})
export class CurrentTempComponent implements OnInit {

  @Input()
  temperature: TempRecord;

  constructor() { }

  ngOnInit(): void {
  }

}
