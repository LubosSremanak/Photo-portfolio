import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  readonly host: string = 'https://formspree.io/f/mgerlvnl';

  constructor(private httpClient: HttpClient) {}

  sendEmail(data: FormGroup): Observable<ArrayBuffer> {
    const httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.httpClient.post(
      this.host,
      {
        name: data.value.name.trim(),
        email: data.value.email.trim(),
        message: data.value.message.trim(),
        _subject:
          data.value.name.trim() + ' ťa chce kontaktovať z tvojho portfólia',
      },
      httpOptions
    );
  }
}
