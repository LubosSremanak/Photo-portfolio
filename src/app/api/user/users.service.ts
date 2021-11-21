import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './model/user';
import {LoginResponse} from './model/loginResponse';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly url: string;
  private readonly options: any;

  constructor(private http: HttpClient) {
    this.url = 'https://lubossremanak.com.d.r2.wbsprt.com/api/controllers/user/LoginController.php';
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  login(user: User): Observable<HttpEvent<any>> {
    return this.http.post<any>(this.url, user, this.options);
  }

  logout(): Observable<HttpEvent<string>> {
    return this.http.delete<string>(this.url, this.options);
  }

  isLogged(): Observable<HttpEvent<LoginResponse>> {
    return this.http.get<LoginResponse>(this.url, this.options);
  }

  changePassword(user: User, newPassword: string): Observable<HttpEvent<any>> {
    return this.http.put<any>(this.url, {user, newPassword}, this.options);
  }
}
