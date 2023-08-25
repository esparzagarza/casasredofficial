import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { catchError, map, of } from 'rxjs';
import { ContactResponse } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class SendAMailService {

  private baseUrl: string = environment.baseUrl;
  private path: string = '/sendAMail';
  private url = `${this.baseUrl + this.path}`;

  constructor(private http: HttpClient) { }

  sendAMail(endpoint: string, body: {}) {
    return this.http.post<ContactResponse>(this.url + endpoint, body)
      .pipe(
        map(resp => resp.status),
        catchError(err => of(err.error.message))
      );

  }
}