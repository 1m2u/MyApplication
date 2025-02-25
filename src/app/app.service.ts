import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Sevadetails {
  sevaCode: string;
  sevaName: string;
  amount: number;
}
@Injectable({
  providedIn: 'root'
})
export class AppService {
  private baseUrl = 'http://localhost:9090'
  private gotramApiUrl = this.baseUrl + '/mytemple/gotrams';
  private occasionApiUrl = this.baseUrl + '/mytemple/occasions';
  private sevaDetailsUrl = this.baseUrl + '/mytemple/sevadetails';
  private receiptnoUrl = this.baseUrl + '/mytemple/receiptno';

  constructor(private http: HttpClient) { }

  getGotrams(): Observable<string[]> {
    return this.http.get<{ gothramName: string }[]>(this.gotramApiUrl).pipe(
      map((response: { gothramName: string }[]) => response.map((item: { gothramName: string }) => item.gothramName))
    );
  }

  getOccasions(): Observable<string[]> {
    return this.http.get<string[]>(this.occasionApiUrl);
  }

  getSevaDetails(): Observable<any[]> {
    return this.http.get<any[]>(this.sevaDetailsUrl);
  }

  getLatestReceiptNumber(): Observable<string> {
    return this.http.get<string>(this.receiptnoUrl);
  }

}
