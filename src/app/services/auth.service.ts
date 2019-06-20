import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'http://localhost:3000/api/';
  isLoggedIn = false;
  redirectUrl: string;

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'signin', data)
      .pipe(
        tap(_ => this.isLoggedIn = true),
        catchError(this.handleError('login', []))
      );
  }

  logout(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'signout')
      .pipe(
        tap(_ => this.isLoggedIn = false),
        catchError(this.handleError('logout', []))
      );
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'signup', data)
      .pipe(
        tap(_ => this.log('login')),
        catchError(this.handleError('login', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}