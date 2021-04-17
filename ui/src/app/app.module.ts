import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TimeagoModule } from 'ngx-timeago';
import { AppComponent } from './app.component';
import { LoadingSpinnerComponent } from './component/loading-spinner/loading-spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    TimeagoModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
