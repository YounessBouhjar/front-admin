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
  selector: 'app-blocage-detail',
  templateUrl: './blocage-detail.component.html',
  styleUrls: ['./blocage-detail.component.css']
})
export class BlocageDetailComponent implements OnInit {
  rest = new FormGroup({
    
    motiff: new FormControl(''),

  });

  
  

  get motiff() {
    return this.rest.get('motiff');
  }
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
          this.route.navigate(['/overview/blocage']);

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
  

bloquer(){
  this.transfertService.findTransfertByCodeTransfert(this.Transfert.codeTransfert).subscribe(
    (data) => {
      this.Transfert = data;
    },
    (error) => {
      console.log(error)

    }
  );
  console.log(this.motiff.value)
  console.log("motif :" +this.Transfert.status)
  if(this.Transfert.status==='à servir'){
    if(this.motiff.value==='')window.alert("Veuillez entrer un motif de bloquage");
    else{


      const message = `Voulez vous vraiment bloquer le transfert ${this.Transfert.codeTransfert} à cause du motif ${this.motiff.value} ?`;

      const dialogData = new ConfirmDialogModel("Lock confirmation", message);
  
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: "400px",
        data: dialogData,
  
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          
          this.transfertService.update(this.Transfert.codeTransfert,this.motiff.value,"bloqué").subscribe(
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
 
 else {
  window.alert("Vous ne pouvez bloquer que les transferts à servir");
  this.route.navigate(['/overview/transferts']);

 }
}


}
