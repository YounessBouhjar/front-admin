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
    this.benefUrl = 'https://edb-admin.herokuapp.com/admin/';
  }
  public findBeneficiaire(id: number): Observable<any> {
    let email = sessionStorage.getItem('email');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    return this.http.get<Beneficiaire[]>(`${this.benefUrl}beneficiaire/findid/${id}`,{headers});
  }}
