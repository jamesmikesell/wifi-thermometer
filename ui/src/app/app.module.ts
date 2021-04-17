import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
