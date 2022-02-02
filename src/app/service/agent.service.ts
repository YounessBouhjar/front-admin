import { Injectable } from '@angular/core';
import { Agent } from '../model/agent';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  private agentUrl: string;
  constructor(private http: HttpClient) {
    this.agentUrl = 'http://localhost:9191/admin/';
  }
  
  public findAllAgents(): Observable<any> {
    let email = 'younessbouhjar55@gmail.com';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    return this.http.get<Agent[]>(this.agentUrl + 'agent/all', {
      headers,
    });
    
  }

  public save(agent: Agent) :Observable<Agent>{
    let email = 'younessbouhjar55@gmail.com';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    return this.http.post<Agent>(this.agentUrl + 'agent/add', agent,{headers});
  }

  public delete(id: number): Observable<void> {
    let email = 'younessbouhjar55@gmail.com';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    return this.http.delete<void>(`${this.agentUrl}agent/delete/${id}`,{headers});
  }
  public update(id:number,agent: Agent): Observable<Agent> {
    let email = 'younessbouhjar55@gmail.com';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    return this.http.put<Agent>(`${this.agentUrl}agent/update/${id}`, agent);
  }

  public findAgent(id: number): Observable<any> {
    let email = 'younessbouhjar55@gmail.com';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    return this.http.get<Agent[]>(`${this.agentUrl}agent/agentid/${id}`,{headers});
  }
}