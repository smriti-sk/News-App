import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getNews(requestBody: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(this.apiUrl, requestBody, httpOptions);
  }
  SearchQueryBasedNews(searchQuery: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // Append the searchQuery to the URL as a query parameter
    const urlWithParams = `${this.apiUrl}/search?q=${encodeURIComponent(searchQuery)}`;

    return this.http.get<any>(urlWithParams, httpOptions);
  }
}
