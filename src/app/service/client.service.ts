import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../Model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clientUrl: string;
  constructor(private http: HttpClient) {
    this.clientUrl = 'http://localhost:9191/admin/';
  }
  public findClient(id: number): Observable<any> {
    let email = sessionStorage.getItem('email');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    return this.http.get<Client[]>(`${this.clientUrl}client/findid/${id}`,{headers});
  }

  public findClientGsm(gsm: string): Observable<any> {
    let email = sessionStorage.getItem('email');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    return this.http.get<Client[]>(`${this.clientUrl}client/findgsm/${gsm}`,{headers});
  }

  public findClientCin(cin: string): Observable<any> {
    let email = sessionStorage.getItem('email');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    return this.http.get<Client[]>(`${this.clientUrl}client/findcin/${cin}`,{headers});
  }
}
