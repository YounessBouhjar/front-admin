import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentService } from '../service/agent.service';
import { ClientService } from '../service/client.service';
import { TransfertService } from '../service/transfert.service';
import { FormControl, FormGroup } from '@angular/forms';
import { BeneficiaireService } from '../service/beneficiaire.service';
import { CompteService } from '../service/compte.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-transfert-detail',
  templateUrl: './transfert-detail.component.html',
  styleUrls: ['./transfert-detail.component.css']
})
export class TransfertDetailComponent implements OnInit {
  rest = new FormGroup({
    
    refTrans: new FormControl(''),
    motiff: new FormControl(''),

  });
 date=new Date()
  compte: any;
  montant: any;
  transfert: any;
  addtransfert: any;
  solde: number;
  get refTrans() {
    return this.rest.get('refTrans');
  }
  
  

  get motiff() {
    return this.rest.get('motiff');
  }
  Transfert: any;
  Transfertt: any;
  idAgent:any;
  idClient:any;
  idBeneficaire:any;
  Beneficiaire:any;
  Client:any;
stat:any;
   edited:any
  constructor(     private router: Router,
    public dialog: MatDialog,
    private route: Router,
    private transfertService: TransfertService,
    private compteService: CompteService,
    private clientService: ClientService,
    ) { }

  ngOnInit(): void {
    this.edited=false;
    
    
  }
  search(){
    this.edited=false;
    this.transfertService.findTransfertByCodeTransfert(this.refTrans.value).subscribe(
      (data) => {
        if(data==null){
          window.alert("La référence de transfert saisie est inexistante")
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

restituer(){
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
  if(this.Transfert.status==='débloqué à servir' ||this.Transfert.status==='à servir'){
    if(this.motiff.value==='')window.alert("Veuillez entrer un motif de restitution");
    else{
      const message = `Voulez vous vraiment restituer le transfert ${this.Transfert.codeTransfert} à cause de ${this.motiff.value} ?`;

    const dialogData = new ConfirmDialogModel("Restitution confirmation", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData,

    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        
        this.stat="restitué"
        this.transfertService.update(this.Transfert.codeTransfert,this.motiff.value,this.stat).subscribe(
          (data) => {
          console.log(data)
          this.update()
  
        },
        (error) => console.log(error)
      );
      }
    });

    }

  }
 else if(this.Transfert.status==='servi'){
  window.alert("Impossible de restituer le transfert car il est déjà payé");
 }
 else if(this.Transfert.status==='bloqué'){
  window.alert("Impossible de restituer le transfert car il est bloqué");
 }
 else {
  window.alert("Impossible de restituer le transfert vérifiez son status");
 }
}


update() {
  this.compteService.findCompte().subscribe(
    (data) => {
      console.log(data)
      this.compte=data
      this.solde=this.compte.solde+this.Transfert.montant

      this.compteService.update(this.compte.nomClient,this.solde).subscribe((result) =>
       this.router.navigate(['/overview/transferts']));

},
(error) => {
  console.log(error)

})
      }
      






}
