import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const baseUrl = 'http://34.16.135.81/api/userDetails';


@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient) {}



 get(username: any): Observable<User> {
    return this.http.get<User>(`${baseUrl}/${username}`);
  }

  update(username: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${username}`, data);
  }

}