
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Transfert } from '../Model/transfert';
import { TransfertService } from '../service/transfert.service';

@Component({
  selector: 'app-deblocage',
  templateUrl: './deblocage.component.html',
  styleUrls: ['./deblocage.component.css']
})
export class DeblocageComponent implements OnInit {

  Transferts: any;
  id: string;
  id2: number;

  dataSource = new MatTableDataSource<Transfert>(this.Transferts);

  


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
    public dialog: MatDialog,
    private route: Router,
    private transfertService: TransfertService
  ) {}

  ngOnInit(): void {
    this.transfertService.findTransfertMultiCritere(null,null,null,
      null,null,"bloqué").subscribe(
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
    );  }
  onRowClicked(row) {
    console.log('Row clicked: ', row);
    console.log(row.codeTransfert)
    this.id2=row.codeTransfert;
    this.route.navigate(['/overview/deblockTransfert/' + this.id2]);

  }

}
