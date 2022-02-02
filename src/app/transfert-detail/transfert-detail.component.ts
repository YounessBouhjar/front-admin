import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentService } from '../service/agent.service';
import { ClientService } from '../service/client.service';
import { TransfertService } from '../service/transfert.service';
import { FormControl, FormGroup } from '@angular/forms';
import { BeneficiaireService } from '../service/beneficiaire.service';

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
    private benefService: BeneficiaireService,
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
        console.log("transfert : " +JSON.stringify(this.Transfert));
        console.log(this.Transfert.idClient);
        console.log(this.Transfert.idAgent);
        console.log(this.Transfert.idBeneficiaire);
        this.edited=true;
        this.idAgent=this.Transfert.idAgent;
        this.clientService.findClient(this.Transfert.idClient).subscribe(
          (data) => {
            this.Client = data.prenom +" "+ data.nom ;
            console.log(data)
          },
          (error) => console.log(error)
        );
        this.benefService.findBeneficiaire(this.Transfert.idBeneficiaire).subscribe(
          (data) => {
            this.Beneficiaire = data.prenom +" "+ data.nom ;
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
      this.stat="restitué"
      this.transfertService.update(this.Transfert.codeTransfert,this.motiff.value,this.stat).subscribe(
        (data) => {
        console.log(data)
        this.router.navigate(['/overview/transferts']);

      },
      (error) => console.log(error)
    );
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


}
