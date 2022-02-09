import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../Model/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifUrl: string;
  constructor(private http: HttpClient) {
    this.notifUrl = 'https://edb-admin.herokuapp.com/admin/';
  }
  public send(notification: Notification) :Observable<any>{
    let email = sessionStorage.getItem('email');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    return this.http.post<Notification>(this.notifUrl + 'notification/send', notification,{headers});
  }
}
