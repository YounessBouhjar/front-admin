import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { Admin } from '../Model/admin';
import { AdminService } from '../service/admin.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  Admins: Admin[];
  id: string;
  dataSource = new MatTableDataSource<Admin>(this.Admins);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = [
    'id',
    'email',
    'actions',
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private route: Router,
    private adminService: AdminService
  ) {}

  deleteAdmin(id: number) {
    this.adminService.delete(id).subscribe(
      (data) => {
        console.log(data);

        this.ngOnInit();
      },
    );
  }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.adminService.findAllAdmins().subscribe(
      (data) => {
        this.Admins = data;
        this.dataSource = new MatTableDataSource<Admin>(this.Admins);
        this.dataSource.paginator = this.paginator;
        console.log("data login : " +JSON.stringify(data));
        console.log("alladmins")

      },
      (error) => {
        this.dataSource = new MatTableDataSource<Admin>(null);
        console.log(error)

      }
    );
  }
  goToForm() {
    this.route.navigate(['/overview/addAdmin']);
  }
  goToAdmins(id2: number) {
    this.route.navigate(['/overview/updateAdmin/' + id2]);
  }


  deleteRecord(selectedItem: any): void {


    const message = `Are you sure you want to delete Admin ${selectedItem.email} ?`;

    const dialogData = new ConfirmDialogModel("Delete confirmation", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData,

    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(selectedItem)
        this.deleteAdmin(selectedItem.id);
        
      }
    });
  }
}
