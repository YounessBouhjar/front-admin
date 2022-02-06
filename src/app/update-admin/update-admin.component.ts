import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {
  admin: any;
  id: number;
  addAdmin = new FormGroup({
    
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.nullValidator),
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
    private adminService: AdminService,
    public dialog: MatDialog,


  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    
    this.adminService.findAdmin(this.id).subscribe(
      
      (data) => {
        console.log(data)

        this.admin = data;

        console.log('testest')

        this.email.setValue(this.admin.email);
        console.log("data  : " +JSON.stringify(data));

      },
      (error) => console.log(error)
    );
  }

  onSubmit() {
    const message = `Are you sure you want to update Admin ${this.admin.email} ?`;

    const dialogData = new ConfirmDialogModel("Update confirmation", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData,

    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.admin = this.addAdmin.value;
        this.adminService
          .update(this.id,this.admin)
          .subscribe((result) => this.router.navigate(['/overview/admins']));
      }
    }
  );
    
  }

  goBack() {
    this.router.navigate(['/overview/admins']);
  }

}


