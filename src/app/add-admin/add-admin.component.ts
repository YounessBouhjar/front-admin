import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from '../Model/admin';
import { Compte } from '../Model/compte';
import { AdminService } from '../service/admin.service';
import { CompteService } from '../service/compte.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  compte :Compte;
  admin: Admin;
  id: string;
  addAdmin = new FormGroup({
    
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });



  get email() {
    return this.addAdmin.get('email');
  }
  get password() {
    return this.addAdmin.get('password');
  }


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminsService: AdminService,
    private compteService: CompteService,

  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    
  }

  onSubmit() {
    this.admin = this.addAdmin.value;
    this.adminsService
      .save(this.admin)
      .subscribe((result) =>{
      console.log(result)
      this.onSubmit2()}
      );
  }

  onSubmit2() {
    // console.log(this.compte)
    this.compte=new Compte()
    this.compte.solde=10000
    this.compte.nomClient=this.email.value
    this.compte.typeCompte="Compte Backoffice"
    console.log(this.compte)
    this.compteService
      .addCompte(this.compte)
      .subscribe((result) => {
        // this.gotoTransfertList()
      console.log("transfert : " +JSON.stringify(result));
     console.log("alltransferts")
     this.gotoAdminList() 

  },
  (error) => {
    console.log(error)

  })
    
      }
  gotoAdminList() {
    this.router.navigate(['/overview/admins']);
  }

  

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getErrorMessages(){
    if (this.password.hasError('required')) 
    return 'You must enter a value';
  }


}

