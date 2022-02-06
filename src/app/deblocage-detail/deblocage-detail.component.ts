import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentService } from '../service/agent.service';
import { ClientService } from '../service/client.service';
import { TransfertService } from '../service/transfert.service';
import { FormControl, FormGroup } from '@angular/forms';
import { BeneficiaireService } from '../service/beneficiaire.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-deblocage-detail',
  templateUrl: './deblocage-detail.component.html',
  styleUrls: ['./deblocage-detail.component.css']
})
export class DeblocageDetailComponent implements OnInit {

  codeTransfert:any;
  Transfert: any;
  Transfertt: any;
  idAgent:any;
  idClient:any;
  idBeneficaire:any;
  Beneficiaire:any;
  Client:any;
stat:any;
   edited:any
  constructor(         private router: ActivatedRoute,
    
    public dialog: MatDialog,
    private route: Router,
    private transfertService: TransfertService,
    private benefService: BeneficiaireService,
    private clientService: ClientService,
    ) { }

  ngOnInit(): void {
    this.codeTransfert = this.router.snapshot.params['codeTransfert'];
    console.log(this.codeTransfert)
    this.transfertService.findTransfertByCodeTransfert(this.codeTransfert).subscribe(
      (data) => {
        if(data==null){
          window.alert("La référence de transfert saisie est inexistante")
          this.route.navigate(['/overview/deblocage']);
        }
        else{
        this.Transfert = data;
        if(this.Transfert.idAgent==1){this.idAgent="Back Office"}
        console.log("transfert : " +JSON.stringify(this.Transfert));
        console.log(this.Transfert.idClient);
        console.log(this.idAgent);
        console.log(this.Transfert.idBeneficiaire);
        this.edited=true;
        this.clientService.findClient(this.Transfert.idClient).subscribe(
          (data) => {
            this.Client = data.prenom +" "+ data.nom ;
            console.log(data)
          },
          (error) => console.log(error)
        );
      }
    },
      (error) => {
        console.log(error)

        }
      
    );
  }
  

debloquer(){
  this.transfertService.findTransfertByCodeTransfert(this.Transfert.codeTransfert).subscribe(
    (data) => {
      this.Transfert = data;
    },
    (error) => {
      console.log(error)

    }
  );
  if(this.Transfert.status!='bloqué'){
  window.alert("Vous ne pouvez débloquer que les transferts bloqué")
  this.route.navigate(['/overview/transferts']);

  }
    else{
      const message = `Voulez vous vraiment débloquer le transfert ${this.Transfert.codeTransfert} ?`;

      const dialogData = new ConfirmDialogModel("Unlock confirmation", message);
  
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: "400px",
        data: dialogData,
  
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          
          this.transfertService.update(this.Transfert.codeTransfert,"","débloqué à servir").subscribe(
            (data) => {
            console.log(data)
            this.route.navigate(['/overview/transferts']);
    
          },
          (error) => console.log(error)
        );
        }
      });
  
    }












  }
 


}

