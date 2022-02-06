import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../Model/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminUrl: string;
  constructor(private http: HttpClient) {
    this.adminUrl = 'http://localhost:9191/admin/';
  }
  
  public findAllAdmins(): Observable<any> {
    let email = 'younessbouhjar55@gmail.com';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    return this.http.get<Admin[]>(this.adminUrl + 'all', {
      headers,
    });
    
  }

  public save(admin: Admin) :Observable<Admin>{
    let email = 'younessbouhjar55@gmail.com';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    return this.http.post<Admin>(this.adminUrl + 'add', admin,{headers});
  }

  public delete(id: number): Observable<void> {
    let email = 'younessbouhjar55@gmail.com';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    return this.http.delete<void>(`${this.adminUrl}delete/${id}`,{headers});
  }
  public update(id:number,admin: Admin): Observable<Admin> {
    let email = 'younessbouhjar55@gmail.com';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    return this.http.put<Admin>(`${this.adminUrl}update/${id}`, admin,{headers});
  }

  public findAdmin(id: number): Observable<any> {
    let email = 'younessbouhjar55@gmail.com';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    return this.http.get<Admin[]>(`${this.adminUrl}adminid/${id}`,{headers});
  }
}