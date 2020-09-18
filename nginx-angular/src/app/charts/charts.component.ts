import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message/message.service';
import { Color } from 'ng2-charts'
import { ChartsService } from './charts.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html'
})
export class ChartsComponent implements OnInit {
  // colors pulled from https://coreui.io/demo/3.0.0/#colors.html
  colors: Color[] = [{ backgroundColor: ['#321fdb', '#f9b115', '#e55353', '#3399ff', '#2eb85c', '#636f83', '#321fdb', '#f9b115', '#e55353', '#3399ff', '#2eb85c', '#636f83', '#321fdb', '#f9b115', '#e55353'] }];

  donutLabels: string[] = [];
  donutData: number[] = [];
  donutType = 'doughnut';

  barOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barLabels: string[] = [];
  barType = 'bar';
  barLegend = false;
  barData: any[] = [{}];

  constructor(private messageService: MessageService, private chartsService: ChartsService) { }

  ngOnInit() {
    this.chartsService.getData().subscribe(res => {
      if (res !== null) {
        this.donutLabels = res.donutLabels;
        this.donutData = res.donutData;
        this.barLabels = res.barLabels;
        this.barData = res.barData;

        this.messageService.success('Got chart data from Spring Boot');
      }
    });
  }
}
