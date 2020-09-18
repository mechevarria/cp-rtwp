import { Injectable } from '@angular/core';
import { MessageService } from '../message/message.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private url = '/express-api/search';

  constructor(private messageService: MessageService, private http: HttpClient) {
  }

  doSearch(search: string, limit: number, fuzzy: number): Observable<any> {
    const options: any = {
      params: new HttpParams()
        .append('search', search)
        .append('limit', limit.toString())
        .append('fuzzy', fuzzy.toString())
    };

    return this.http.get<any>(this.url, options).pipe(
      catchError(error => {
        this.messageService.error(`search() ${error.message}`);
        return of(null);
      })
    )
  };
}
