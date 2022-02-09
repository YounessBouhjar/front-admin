import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Admin } from '../Model/admin';


@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  constructor(private httpClient: HttpClient) { }

  authentificate(email, password) {
    let headers = new HttpHeaders({

      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Authorization': 'Basic ' + btoa(email + ':' + password),
    });

    return this.httpClient
      .get<Admin>('https://edb-admin.herokuapp.com/admin/username/'+email, {headers,})
      .pipe( 
        map((userData) => {
          sessionStorage.setItem('email', email);
          console.log("userData : " +JSON.stringify(userData))
          console.log("Is logged in " +this.isUserLoggedIn());
          let authString = 'Basic ' + btoa(email + ':' + password);

          sessionStorage.setItem('basicauth', authString);

          return userData;
        })
        
      );
      
      
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('email');
    console.log("user : " +user)
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('email');
  }
}
