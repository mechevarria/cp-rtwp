import { Component, OnInit } from '@angular/core';
import { StatusService } from './status.service';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  response: any = {};
  name: string = '';
  api: string = 'springboot-api/status';
  isBusy: boolean = false;

  constructor(private statusService: StatusService, private messageService: MessageService) { }

  checkApi(): void {
    this.isBusy = true;
    this.statusService.getStatus(this.api, this.name).subscribe(res => {
      this.isBusy = false;
      this.response = res;

      if (this.response.status === 200) {
        this.messageService.success(`Successfully checked ${this.api}`);
      }
    });
  }

  clear(): void {
    this.name = '';
    this.response = {};
  }

  ngOnInit(): void {
  }

}
