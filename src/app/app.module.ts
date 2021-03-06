import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { MatDividerModule } from '@angular/material/divider';
import { AgentComponent } from './agent/agent.component';
import { AddAgentComponent } from './add-agent/add-agent.component';
import { UpdateAgentComponent } from './update-agent/update-agent.component';
import { TransfertComponent } from './transfert/transfert.component';
import { TransfertDetailComponent } from './transfert-detail/transfert-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddTransfertComponent } from './add-transfert/add-transfert.component';
import { BlocageComponent } from './blocage/blocage.component';
import { BlocageDetailComponent } from './blocage-detail/blocage-detail.component';
import { DeblocageComponent } from './deblocage/deblocage.component';
import { DeblocageDetailComponent } from './deblocage-detail/deblocage-detail.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AdminComponent } from './admin/admin.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { UpdateAdminComponent } from './update-admin/update-admin.component';
import { BasicAuthHttpInterceptorService } from './service/basic-auth-http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AgentComponent,
    AddAgentComponent,
    UpdateAgentComponent,
    TransfertComponent,
    TransfertDetailComponent,
    AddTransfertComponent,
    BlocageComponent,
    BlocageDetailComponent,
    DeblocageComponent,
    DeblocageDetailComponent,
    ConfirmDialogComponent,
    AdminComponent,
    AddAdminComponent,
    UpdateAdminComponent,
    
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    MatToolbarModule,
    MatDividerModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    HttpClientModule,
    NgbModule,


  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: BasicAuthHttpInterceptorService,
    multi: true,
  },
  ],
  bootstrap: [AppComponent],
  entryComponents:[AddAdminComponent]
})
export class AppModule { }
