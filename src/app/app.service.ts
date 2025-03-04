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
  private baseUrl = 'http://localhost:9090';
  private gotramApiUrl = this.baseUrl + '/mytemple/gotrams';
  private occasionApiUrl = this.baseUrl + '/mytemple/occasions';
  private sevaDetailsUrl = this.baseUrl + '/mytemple/sevadetails';
  private receiptnoUrl = this.baseUrl + '/mytemple/receiptno';
  // Updated URL to match the error path
  private saveFormDataUrl = this.baseUrl + '/mytemple/sevareceipt';
  private printReceiptUrl = this.baseUrl + '/mytemple/printreceipt';

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

  submitMultipleSevaData(sevaData: any[]): Observable<any[]> {
    return new Observable(observer => {
      const results: any[] = [];
      let completed = 0;
  
      sevaData.forEach(item => {
        this.http.post(this.saveFormDataUrl, item).subscribe({
          next: (result) => {
            results.push(result);
            completed++;
  
            if (completed === sevaData.length) {
              observer.next(results);
              observer.complete();
            }
          },
          error: (err) => {
            results.push({ success: false, error: err, item });
            completed++;
  
            if (completed === sevaData.length) {
              observer.next(results);
              observer.complete();
            }
          }
        });
      });
    });
  }
  // If you want to add the print receipt functionality:
  printReceipt(receiptNo: string): Observable<Blob> {
    return this.http.get(`${this.printReceiptUrl}/${receiptNo}`, {
      responseType: 'blob'
    });
  }
}