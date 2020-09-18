import { Injectable } from '@angular/core';
import { MessageService } from '../message/message.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  private typesUrl = '/springboot-api/types';
  private analysisUrl = '/springboot-api/analysis';

  constructor(private messageService: MessageService, private http: HttpClient) {
  }

  getAllTypes(): Observable<any> {
    return this.http.get<any>(this.typesUrl).pipe(
      catchError(error => {
        this.messageService.error(`analysis() ${error.message}`);
        return of(null);
      })
    )
  };

  getAnalysis(type: string, limit: number): Observable<any> {
    const options: any = {
      params: new HttpParams()
        .append('type', type)
        .append('limit', limit.toString())
    };

    return this.http.get<any>(this.analysisUrl, options).pipe(
      catchError(error => {
        this.messageService.error(`getAnalysis() ${error.message}`);
        return of(null);
      })
    )
  };

  
}
