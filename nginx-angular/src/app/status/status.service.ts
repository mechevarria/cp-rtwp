import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getStatus(url: string, name: string): Observable<any> {
    const options: any = {
      observe: 'response',
      params: {
        name: name
      }
    }
    return this.http.get<any>(url, options)
      .pipe(
        catchError(error => {
          this.messageService.error(`getStatus() ${error.message}`);
          return of(error);
        })
      );
  }
}
