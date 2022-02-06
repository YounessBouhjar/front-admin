import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AddAgentComponent } from '../add-agent/add-agent.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
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
    const dialogConfig =new MatDialogConfig();
    dialogConfig.autoFocus=true
    dialogConfig.width="60%"
    dialogConfig.height="55%"
    this.dialog.open(AddAgentComponent,dialogConfig)

  }
  goToAgents(id2: number) {
    this.route.navigate(['/overview/updateAgent/' + id2]);
  }


  deleteRecord(selectedItem: any): void {


    const message = `Are you sure you want to delete Agent ${selectedItem.nom } ${selectedItem.prenom} ?`;

    const dialogData = new ConfirmDialogModel("Delete confirmation", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData,

    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(selectedItem)
        this.deleteAgent(selectedItem.id);
        
      }
    });
  }
}
