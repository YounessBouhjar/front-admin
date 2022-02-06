import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AddTransfertComponent } from '../add-transfert/add-transfert.component';
import { Compte } from '../Model/compte';
import { Transfert } from '../Model/transfert';
import { CompteService } from '../service/compte.service';
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
  isReadOnly: boolean;
  compte:Compte;
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
    'motif'


  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private route: Router,
    private transfertService: TransfertService,
    private compteService: CompteService
  ) {}

  ngOnInit(): void {
    this.isReadOnly=true
    this.HandleChange();
    this.solde();
  }

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
    const dialogConfig =new MatDialogConfig();
    dialogConfig.autoFocus=true
    dialogConfig.width="60%"
    dialogConfig.height="70%"
    this.dialog.open(AddTransfertComponent,dialogConfig)

  }
  solde(){
    this.compteService.findCompte().subscribe(
      (data) => {
        console.log(data)
        this.compte=data    
  
},   (error) => {
    console.log(error)

  });
  
  
}
}