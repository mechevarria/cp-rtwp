import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { EventService } from './event.service';
import { Event } from './event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['event.component.css']
})
export class EventComponent implements OnInit {

  events: Event[] = [];
  count: number = 0;
  limit: number = 10;
  page: number = 1;
  modalRef: BsModalRef;
  detail: Event;
  isBusy: boolean = false;

  constructor(private eventService: EventService, private modalService: BsModalService) {
  }

  viewEvent(template: TemplateRef<any>, event: Event) {
    this.detail = event;
    const config: ModalOptions = { class: 'modal-lg' };
    this.modalRef = this.modalService.show(template, config);
  }

  load(): void {
    this.isBusy = true;
    this.eventService.getEvents(this.page, this.limit).subscribe(res => {
      this.isBusy = false;
      if (res !== null) {
        this.events = res.results;
        this.count = parseInt(res.count);
      }
    });
  }

  pageChanged(event: any): void {
    this.page = event.page;
    this.load();
  }

  limitChanged(): void {
    this.page = 1;
    this.load();
  }

  ngOnInit() {
    this.load();
  }
}
