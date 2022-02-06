import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentComponent } from '../agent/agent.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { Agent } from '../Model/agent';
import { AgentService } from '../service/agent.service';

@Component({
  selector: 'app-update-agent',
  templateUrl: './update-agent.component.html',
  styleUrls: ['./update-agent.component.css']
})
export class UpdateAgentComponent implements OnInit {
  agent: any;
  id2: number;
  addAgent = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.nullValidator),
  });

  get prenom() {
    return this.addAgent.get('prenom');
  }

  get nom() {
    console.log(this.addAgent.get('nom'));
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
    public dialog: MatDialog,


  ) {}

  ngOnInit(): void {
    this.id2 = this.route.snapshot.params['id2'];
    console.log(this.id2);
    
    this.agentService.findAgent(this.id2).subscribe(
      
      (data) => {
        console.log(data)

        this.agent = data;

        console.log('testest')

        this.nom.setValue(this.agent.nom);

        this.prenom.setValue(this.agent.prenom);
        this.email.setValue(this.agent.email);
        console.log("data  : " +JSON.stringify(data));

      },
      (error) => console.log(error)
    );
  }

  onSubmit() {
    const message = `Are you sure you want to update Agent ${this.agent.nom} ${this.agent.prenom} ?`;

    const dialogData = new ConfirmDialogModel("Update confirmation", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData,

    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.agent = this.addAgent.value;
        this.agentService
          .update(this.id2,this.agent)
          .subscribe((result) => this.router.navigate(['/overview/agents']));
      }
    }
  );
    
  }

  goBack() {
    this.router.navigate(['/overview/agents']);
  }

}

