import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { Transfert } from '../Model/transfert';

@Injectable({
  providedIn: 'root',
})
export class TransfertService {
  private transfertUrl: string;
  constructor(private http: HttpClient) {
    this.transfertUrl = 'http://localhost:9191/admin/';
  }

  public findAllTransferts(): Observable<any> {
    let email = 'younessbouhjar55@gmail.com';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    return this.http.get<Transfert[]>(this.transfertUrl + 'transfert/alltransferts', {
      headers,
    });
  }
  public save(transfert: Transfert) :Observable<any>{
    let email = 'younessbouhjar55@gmail.com';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    return this.http.post<Transfert>(this.transfertUrl + 'transfert/add', transfert,{headers});
  }
  public update(codeTransfert: number,motif:string,status:string): Observable<any> {
    let email = 'younessbouhjar55@gmail.com';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    let params = new HttpParams()
      .set('motif', motif)
      .set('status', status)
    return this.http.put<Transfert>(
      this.transfertUrl+"transfert/status/"+codeTransfert, null, {
        headers: headers,
        params: params,
      });
  }


  public findTransfertMultiCritere(
    idAgent: number,
    idClient: number,
    pi: string,
    numGsm: number,
    codeTransfert: string,
    status: string
  ): Observable<Transfert[]> {
    let email = 'younessbouhjar55@gmail.com';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    let params = new HttpParams();
    if(idAgent){
      params=params.set('idAgent', idAgent.toString())
      
    }
    if(idClient){
      params=params.set('idClient', idClient.toString())
    }
    if(pi){
      params=params.set('pi', pi)
    }
    if(numGsm){
      params=params.set('numGsm', numGsm.toString())
    }
    if(codeTransfert){
      params=params.set('codeTransfert', codeTransfert)
    }
    if(status){
      params=params.set('status', status);
    }
     
      
    return this.http.post<Transfert[]>(`${this.transfertUrl}transfert/tranSearch`, null, {
      headers: headers,
      params: params,
    });
  }

  public findTransfertByCodeTransfert(codeTransfert:any): Observable<Transfert[]> {
    let email = 'younessbouhjar55@gmail.com';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    return this.http.get<Transfert[]>(`${this.transfertUrl}transfert/find/${codeTransfert}`, {
      headers,
    });
  }
}
