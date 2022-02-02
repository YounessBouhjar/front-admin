import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Agent } from '../Model/agent';
import { AgentService } from '../service/agent.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {
  AGENTS: Agent[];
  id: string;
  dataSource = new MatTableDataSource<Agent>(this.AGENTS);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = [
    'id',
    
    'nom',
    'prenom',
    'email',
    
    'actions',
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private route: Router,
    private agentService: AgentService
  ) {}

  deleteAgent(id: number) {
    this.agentService.delete(id).subscribe(
      (data) => {
        console.log(data);

        this.ngOnInit();
      },
    );
  }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.agentService.findAllAgents().subscribe(
      (data) => {
        this.AGENTS = data;
        this.dataSource = new MatTableDataSource<Agent>(this.AGENTS);
        this.dataSource.paginator = this.paginator;
        console.log("data login : " +JSON.stringify(data));
        console.log("allagents")

      },
      (error) => {
        this.dataSource = new MatTableDataSource<Agent>(null);
        console.log(error)

      }
    );
  }
  goToForm() {
    this.route.navigate(['/overview/addAgent']);
  }
  goToAgents(id2: number) {
    this.route.navigate(['/overview/updateAgent/' + id2]);
  }
  openDialog(code: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        message: "Voulez vous supprimer l'agent " + code + '?',
        codeSupp: code,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteAgent(result.data.codeSupp);
      }
    });
  }
}
