import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAgentComponent } from './add-agent/add-agent.component';
import { AddTransfertComponent } from './add-transfert/add-transfert.component';
import { AgentComponent } from './agent/agent.component';
import { BlocageDetailComponent } from './blocage-detail/blocage-detail.component';
import { BlocageComponent } from './blocage/blocage.component';
import { DeblocageDetailComponent } from './deblocage-detail/deblocage-detail.component';
import { DeblocageComponent } from './deblocage/deblocage.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuardService } from './service/auth-guard.service';
import { TransfertDetailComponent } from './transfert-detail/transfert-detail.component';
import { TransfertComponent } from './transfert/transfert.component';
import { UpdateAgentComponent } from './update-agent/update-agent.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'overview',
    component: HomeComponent,
    canActivate: [AuthGuardService] ,
  
    children: [ 
      
      {
        path: 'agents',
        component: AgentComponent,
        canActivate: [AuthGuardService] 
      }, 
      {
        path: 'addAgent',
        component: AddAgentComponent,
        canActivate: [AuthGuardService] 
      },   
      {
        path: 'updateAgent/:id2',
        component: UpdateAgentComponent,
        canActivate: [AuthGuardService] 
      }, 
      {
        path: 'transferts',
        component: TransfertComponent,
        canActivate: [AuthGuardService] 
      }, 
      
      {
        path: 'restitution',
        component: TransfertDetailComponent,
        canActivate: [AuthGuardService] 
      },  
      {
        path: 'blocage',
        component: BlocageComponent,
        canActivate: [AuthGuardService] 
      },  
      {
        path: 'addTransfert',
        component: AddTransfertComponent,
        canActivate: [AuthGuardService] 
      },  
      {
        path: 'blockTransfert/:codeTransfert',
        component: BlocageDetailComponent,
        canActivate: [AuthGuardService] 
      },  
      {
        path: 'deblocage',
        component: DeblocageComponent,
        canActivate: [AuthGuardService] 
      },  
      {
        path: 'deblockTransfert/:codeTransfert',
        component: DeblocageDetailComponent,
        canActivate: [AuthGuardService] 
      }, 
      
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
