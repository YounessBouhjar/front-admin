import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../Model/client';
import { Transfert } from '../Model/transfert';
import { ClientService } from '../service/client.service';
import { TransfertService } from '../service/transfert.service';

@Component({
  selector: 'app-add-transfert',
  templateUrl: './add-transfert.component.html',
  styleUrls: ['./add-transfert.component.css']
})
export class AddTransfertComponent implements OnInit {

  
  transfert: Transfert;
  id: string;
  idClient:any;
  client:any
  addtransfert = new FormGroup({
    pi: new FormControl('', Validators.required),
    numGsm: new FormControl('', Validators.required),
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    // GsmBenef: new FormControl('', Validators.required),
    montant: new FormControl('', Validators.required),
    nomBenef: new FormControl('', Validators.required),
    prenomBenef: new FormControl('', Validators.required),
    motifTransfert: new FormControl('', Validators.required),

    
  });

  get pi() {
    return this.addtransfert.get('pi');
  }

  get numGsm() {
    return this.addtransfert.get('numGsm');
  }

  // get GsmBenef() {
  //   return this.addtransfert.get('GsmBenef');
  // }
  get montant() {
    return this.addtransfert.get('montant');
  }

  get motifTransfert() {
    return this.addtransfert.get('motifTransfert');
  }
  get nom() {
    return this.addtransfert.get('nom');
  }

  get prenom() {
    return this.addtransfert.get('prenom');
  }

  get prenomBenef() {
    return this.addtransfert.get('prenomBenef');
  }  get nomBenef() {
    return this.addtransfert.get('nomBenef');
  }


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transfertService: TransfertService,
    private clientService:ClientService
  ) {}

  ngOnInit(): void {
    
  }
onchange(){
  this.clientService.findClientCin(this.pi.value).subscribe(
    (data) => {
      console.log(data)

      this.client= data;
    this.idClient=data.clientId


    this.addtransfert.get("numGsm").setValue(data.numGSM);
    this.addtransfert.get("nom").setValue(data.nom);
    this.addtransfert.get("prenom").setValue(data.prenom);
      console.log(this.motifTransfert.value)
},   (error) => {
    console.log(error)

  });
}
  onSubmit() {
    this.transfert = this.addtransfert.value;
    this.transfert.idAgent=1
      this.transfert.idClient=this.idClient
    this.transfertService
      .save(this.transfert)
      .subscribe((result) => {
        // this.gotoTransfertList()
      console.log("transfert : " +JSON.stringify(result));
     console.log("alltransferts")

  },
  (error) => {
    console.log(error)

  })
    
      };
  




  gotoTransfertList() {
    this.router.navigate(['/overview/transferts']);
  }

  reset() {
    this.addtransfert.reset();
  }

  getErrorMessage(){
    if (this.pi.hasError('required')||this.numGsm.hasError('required')||this.montant.hasError('required')||this.nom.hasError('required')||this.prenom.hasError('required')) 
    return 'You must enter a value';
  }

//this.GsmBenef.hasError('required')||
}