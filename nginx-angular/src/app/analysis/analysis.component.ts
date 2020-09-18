import { Component, OnInit, ViewChild } from '@angular/core';
import { AnalysisService } from './analysis.service';
import { CloudData, TagCloudComponent } from 'angular-tag-cloud-module';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  @ViewChild(TagCloudComponent, { static: false }) tagCloudComponent: TagCloudComponent;

  selected = '';
  types: string[] = [];
  limit = 30;
  data: CloudData[] = [];
  isBusy = false;

  constructor(private analysisSerivce: AnalysisService, private messageService: MessageService) { }

  update(): void {
    this.isBusy = true;
    this.analysisSerivce.getAnalysis(this.selected, this.limit).subscribe(res => {
      this.isBusy = false;
      if (res !== null) {
        this.data = res;
        this.tagCloudComponent.reDraw();
        this.messageService.success(`Updated word cloud for '${this.selected}' from Spring Boot`);
      }
    });

  }

  ngOnInit() {
    this.isBusy = true;
    this.analysisSerivce.getAllTypes().subscribe(res => {
      this.isBusy = false;
      this.types = res;
    });
  }

}
