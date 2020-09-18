import { Component, OnInit, TemplateRef } from '@angular/core';
import { Event } from '../event/event';
import { SearchService } from './search.service';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  events: Event[] = [];
  limit: number = 10;
  fuzzy: number = 0.8;
  filter: string = '';

  constructor(private searchService: SearchService, private messageService: MessageService) { }

  load(): void {
    this.searchService.doSearch(this.filter, this.limit, this.fuzzy).subscribe(res => {
      if (res !== null) {
        this.events = res.results;
        this.messageService.success(`${res.count} results returned`);
      }
    });
  }

  ngOnInit() {
  }

}
