import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAgentComponent } from './add-agent/add-agent.component';
import { AddTransfertComponent } from './add-transfert/add-transfert.component';
import { AgentComponent } from './agent/agent.component';
import { BlocageComponent } from './blocage/blocage.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
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
  
    children: [ 
      
      {
        path: 'agents',
        component: AgentComponent,
      }, 
      {
        path: 'addAgent',
        component: AddAgentComponent,
      },   
      {
        path: 'updateAgent/:id2',
        component: UpdateAgentComponent,
      }, 
      {
        path: 'transferts',
        component: TransfertComponent,
      }, 
      
      {
        path: 'restitution',
        component: TransfertDetailComponent,
      },  
      {
        path: 'blocage',
        component: BlocageComponent,
      },  
      {
        path: 'addTransfert',
        component: AddTransfertComponent,
      },   
      
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
