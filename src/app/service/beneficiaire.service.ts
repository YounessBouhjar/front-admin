import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beneficiaire } from '../Model/beneficiaire';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaireService {

  private benefUrl: string;
  constructor(private http: HttpClient) {
    this.benefUrl = 'http://localhost:9191/admin/';
  }
  public findBeneficiaire(id: number): Observable<any> {
    let email = 'younessbouhjar55@gmail.com';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    return this.http.get<Beneficiaire[]>(`${this.benefUrl}beneficiaire/findid/${id}`,{headers});
  }}
