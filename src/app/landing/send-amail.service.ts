import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ContactResponse } from './interfaces';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendAMailService {

  private baseUrl: string = environment.baseUrl;
  private endpoint: string = '/sendMail';
  private url = `${this.baseUrl + this.endpoint}`;

  constructor(private http: HttpClient) { }

  sendAMail(name: string, email: string, subject: string, message: string) {

    const body = { name, email, subject, message }

    return this.http.post<ContactResponse>(this.url, body)
      .pipe(
        tap(resp => {
          if (resp.status == 200) {
            console.log('posted on service');
          }
        }),
        map(resp => resp.status),
        catchError(err => of(err.error.message))
      );

  }
}
