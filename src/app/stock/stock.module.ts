import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockRoutingModule } from './stock-routing.module';
import { ListAddEditEquipementComponent } from '../stock/list-add-edit-equipement/list-add-edit-equipement.component';
import { ListBoncommandeComponent } from '../stock/list-boncommande/list-boncommande.component';
import { AddEditBoncommandeComponent } from '../stock/add-edit-boncommande/add-edit-boncommande.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule  } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddEditEquipementComponent } from './add-edit-equipement/add-edit-equipement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowBoncommandeComponent } from './show-boncommande/show-boncommande.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    ListAddEditEquipementComponent,
    ListBoncommandeComponent,
    AddEditBoncommandeComponent,
    AddEditEquipementComponent,
    ShowBoncommandeComponent
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatSnackBarModule,
    MatChipsModule,
    MatTooltipModule,
    MatNativeDateModule,
    ChartsModule
  ]
})
export class StockModule { }
