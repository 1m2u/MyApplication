import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,catchError  } from 'rxjs/operators';

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
  private loginUrl = this.baseUrl + '/mytemple/login';

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

  getFormDetailsByMobileNo(mobileNo: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/mytemple/lookup/${mobileNo}`);
  }
  verifyCredentials(username: string, password: string): Observable<boolean> {
    const loginData = { username, password };

    return this.http.post<any>(this.baseUrl, loginData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError((error) => {
        console.error('Authentication failed', error);
        throw error; // Re-throw the error to be caught in the component's subscription
      })
    );
  }

  /**
   * Checks if the user is logged in (based on session or local storage).
   * @returns A boolean indicating whether the user is logged in.
   */
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true' || sessionStorage.getItem('isLoggedIn') === 'true';
  }

  /**
   * Logs the user out by clearing session and local storage.
   */
  logout(): void {
    localStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    sessionStorage.removeItem('username');
  }
}