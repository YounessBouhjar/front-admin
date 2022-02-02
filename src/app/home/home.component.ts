import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';  
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthentificationService } from '../service/authentification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
isHandset$: Observable<boolean> = this.breakpointObserver
.observe(Breakpoints.Handset)
.pipe(
  map((result) => result.matches),
  shareReplay()
);

constructor(
private breakpointObserver: BreakpointObserver,
private authentificationService: AuthentificationService,
private router: Router,

) {}
logOut() {
this.authentificationService.logOut();
this.router.navigate(['/login']);
}

}
