import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { TimeagoModule } from 'ngx-timeago';
import { AppComponent } from './app.component';
import { CurrentTempComponent } from './component/current-temp/current-temp.component';
import { LoadingSpinnerComponent } from './component/loading-spinner/loading-spinner.component';
import { TempChartComponent } from './component/temp-chart/temp-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    LoadingSpinnerComponent,
    CurrentTempComponent,
    TempChartComponent
  ],
  imports: [
    BrowserModule,
    TimeagoModule.forRoot(),
    ChartsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
