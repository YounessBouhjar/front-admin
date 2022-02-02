import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Agent } from '../Model/agent';
import { AgentService } from '../service/agent.service';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css']
})
export class AddAgentComponent implements OnInit {

  agent: Agent;
  id: string;
  addAgent = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });

  get prenom() {
    return this.addAgent.get('prenom');
  }

  get nom() {
    return this.addAgent.get('nom');
  }

  get email() {
    return this.addAgent.get('email');
  }
  get password() {
    return this.addAgent.get('password');
  }


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agentService: AgentService,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    
  }

  onSubmit() {
    this.agent = this.addAgent.value;
    this.agentService
      .save(this.agent)
      .subscribe((result) => this.gotoAgentList());
  }

  gotoAgentList() {
    this.router.navigate(['/overview/agents']);
  }

  reset() {
    this.addAgent.reset();
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getErrorMessages(){
    if (this.nom.hasError('required')||this.prenom.hasError('required')||this.password.hasError('required')) 
    return 'You must enter a value';
  }


}
