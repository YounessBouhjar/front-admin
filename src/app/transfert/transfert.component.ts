import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Transfert } from '../Model/transfert';
import { TransfertService } from '../service/transfert.service';

@Component({
  selector: 'app-transfert',
  templateUrl: './transfert.component.html',
  styleUrls: ['./transfert.component.css']
})
export class TransfertComponent implements OnInit {
  Transferts: any;
  id: string;
  id2: number;

  dataSource = new MatTableDataSource<Transfert>(this.Transferts);
  TransfertCrit = new FormGroup({
    CodeAgent: new FormControl(''),
    CodeClient: new FormControl(''),
    pi: new FormControl(''),
    gsm: new FormControl(''),
    refTrans: new FormControl(''),
    Statut: new FormControl(''),
  });

  get CodeAgent() {
    return this.TransfertCrit.get('CodeAgent');
  }

  get CodeClient() {
    return this.TransfertCrit.get('CodeClient');
  }

  get pi() {
    return this.TransfertCrit.get('pi');
  }
  get gsm() {
    return this.TransfertCrit.get('gsm');
  }

  get refTrans() {
    return this.TransfertCrit.get('refTrans');
  }
  get Statut() {
    return this.TransfertCrit.get('Statut');
  }



  result: any;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = [
    'codeTransfert',
    'idAgent',
    'idClient',
    'pi',
    'numGsm',
    'benef',
    'montant',
    'motifTransfert',
    'status',


  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private route: Router,
    private transfertService: TransfertService
  ) {}

  ngOnInit(): void {
    this.HandleChange();
  }


//   onRowClicked(row) {
//     console.log('Row clicked: ', row);
//     console.log(row.codeTransfert)
//     this.id2=row.codeTransfert;
//     this.route.navigate(['/overview/transfert/detail/' + this.id2]);

// }
// goToAgents(id2: number) {
//   this.route.navigate(['/overview/updateAgent/' + id2]);
// }  
  HandleChange(){
    this.Transferts=this.TransfertCrit.value;
    console.log(this.Transferts)


    this.transfertService.findTransfertMultiCritere(this.CodeAgent.value,this.CodeClient.value,this.pi.value,
      this.gsm.value,this.refTrans.value,this.Statut.value).subscribe(
      (data) => {
        this.Transferts = data;
        this.dataSource = new MatTableDataSource<Transfert>(this.Transferts);
        this.dataSource.paginator = this.paginator;
        console.log("data login : " +JSON.stringify(data));
        console.log("alltransferts")

      },
      (error) => {
        this.dataSource = new MatTableDataSource<Transfert>(null);
        console.log(error)

      }
    );

  }
  goToForm() {
    this.route.navigate(['/overview/addTransfert']);
  }
}
