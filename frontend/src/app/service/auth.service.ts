import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = JSON.parse(sessionStorage.getItem('loginUser'));
  private ROOT_URL = `${environment.PORT_URL}/auth`;

  constructor(private http: HttpClient) {}

  get(url: any): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `${this.user.token}`,
    });
    return this.http.get(`${this.ROOT_URL}/${url}`, { headers: headers });
  }

  post(url: any, payload: any): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `${this.user.token}`,
    });
    return this.http.post(`${this.ROOT_URL}/${url}`, payload, {
      headers: headers,
    });
  }

  put(url: any, payload: any): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `${this.user.token}`,
    });
    return this.http.put(`${this.ROOT_URL}/${url}`, payload, {
      headers: headers,
    });
  }

  delete(url: any): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `${this.user.token}`,
    });
    return this.http.delete(`${this.ROOT_URL}/${url}`, { headers: headers });
  }
}
