import { Injectable } from '@angular/core';
import { Agent } from '../Model/agent';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  private agentUrl: string;
  constructor(private http: HttpClient) {
    this.agentUrl = 'https://edb-admin.herokuapp.com/admin/';
  }
  
  public findAllAgents(): Observable<any> {
    let email = sessionStorage.getItem('email');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    return this.http.get<Agent[]>(this.agentUrl + 'agent/all', {
      headers,
    });
    
  }

  public save(agent: Agent) :Observable<Agent>{
    let email = sessionStorage.getItem('email');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    return this.http.post<Agent>(this.agentUrl + 'agent/add', agent,{headers});
  }

  public delete(id: number): Observable<void> {
    let email = sessionStorage.getItem('email');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    return this.http.delete<void>(`${this.agentUrl}agent/delete/${id}`,{headers});
  }
  public update(agent: Agent): Observable<Agent> {
    let email = sessionStorage.getItem('email');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    return this.http.put<Agent>(`${this.agentUrl}agent/update`, agent,{headers});
  }

  public findAgent(id: number): Observable<any> {
    let email = sessionStorage.getItem('email');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    return this.http.get<Agent[]>(`${this.agentUrl}agent/agentid/${id}`,{headers});
  }
}
