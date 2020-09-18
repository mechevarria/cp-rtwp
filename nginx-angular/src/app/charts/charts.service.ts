import { Injectable } from '@angular/core';
import { MessageService } from '../message/message.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  private url = '/springboot-api/chart';

  constructor(private messageService: MessageService, private http: HttpClient) {
  }

  getData(): Observable<any> {
    return this.http.get<any>(this.url).pipe(
      catchError(error => {
        this.messageService.error(`getData() ${error.message}`);
        return of(null);
      })
    )
  };
}
