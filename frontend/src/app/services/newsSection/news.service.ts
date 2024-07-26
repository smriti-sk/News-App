import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'http://localhost:8080'; // Change this URL to your API endpoint
  requestBody = {
    "category":"politics",
	"country":"au",
	"language":"en"
}

  constructor(private http: HttpClient) { }

  searchNews(searchTerm: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // Set query parameters
    const params = new HttpParams().set('q', searchTerm);

    // Make GET request with query parameters
    return this.http.get<any>(`${this.apiUrl}/search`, { params: params, ...httpOptions });
  }
  getNews(requestBody: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(this.apiUrl, requestBody, httpOptions);
  }
}
