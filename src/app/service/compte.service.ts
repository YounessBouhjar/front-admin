import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compte } from '../Model/compte';

@Injectable({
  providedIn: 'root'
})
export class CompteService {
  private compteUrl: string;
  constructor(private http: HttpClient) {
    this.compteUrl = 'http://localhost:9191/admin/';
  }

  public addCompte(compte:Compte): Observable<any> {
    let email = 'younessbouhjar55@gmail.com';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    return this.http.post<Compte>(this.compteUrl + 'compte/add',compte, {
      headers,
    });
  }
  public findCompte(): Observable<any> {
    let email = 'younessbouhjar55@gmail.com';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    return this.http.get<Compte>(`${this.compteUrl}compte/getBackoffice`,{headers});
  }

  public update(nomClient:string,solde: number): Observable<any> {
    let email = 'younessbouhjar55@gmail.com';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    console.log(solde)
    console.log(solde.toString())
    let params = new HttpParams()
      .set('nomClient', nomClient)
      .set('solde', solde.toString())
    return this.http.put<Compte>(
      this.compteUrl+"compte/updateSolde/"+nomClient, null, {
        headers: headers,
        params: params,
      });
  }


  // public save(transfert: Transfert) :Observable<any>{
  //   let email = 'younessbouhjar55@gmail.com';
  //   let password = 'admin';
  //   const headers = new HttpHeaders({
  //     Authorization: 'Basic ' + btoa(email + ':' + password),
  //   });
  //   return this.http.post<Transfert>(this.transfertUrl + 'transfert/add', transfert,{headers});
  // }
  // public update(codeTransfert: number,motif:string,status:string): Observable<any> {
  //   let email = 'younessbouhjar55@gmail.com';
  //   let password = 'admin';
  //   const headers = new HttpHeaders({
  //     Authorization: 'Basic ' + btoa(email + ':' + password),
  //   });
  //   let params = new HttpParams()
  //     .set('motif', motif)
  //     .set('status', status)
  //   return this.http.put<Transfert>(
  //     this.transfertUrl+"transfert/status/"+codeTransfert, null, {
  //       headers: headers,
  //       params: params,
  //     });
  // }
}