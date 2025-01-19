import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import {
  FormControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { APIClient, InvoiceDto } from '@shared/services/api-client/veterinary-api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { duration } from 'moment';

@Component({
  selector: 'app-add-invoice',
  standalone: true,
  imports:[
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatDatepickerModule
  ],
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss']
})
export class AddInvoiceComponent implements OnInit {

  invoice: InvoiceDto = new InvoiceDto();


private _formBuilder = inject(FormBuilder);


constructor(private apiService: APIClient, public dialogRef: MatDialogRef<AddInvoiceComponent>,
  private snackBar: MatSnackBar
) {}

  readonly range = new FormGroup({
  start: new FormControl<Date | null>(null),
  end: new FormControl<Date | null>(null),
  });

  ngOnInit(): void { }

  onSubmit() {
      // Log current data to ensure everything is correct
      console.log('Submitting the following data:', this.invoice);

      // Set animal object in animalowner
      this.invoice.invoiceId = 0;
      this.invoice.paymentDate = new Date();

      // Call backend service to add the owner and animal
      this.apiService.add9(this.invoice).subscribe({
        next: (response) => {
          console.log('Response from backend:', response);
          this.snackBar.open('Invoice added successfully!', 'Close', { duration: 3000 })
            this.dialogRef.close(); // Close the dialog on successful submission
        },
        error: (err) => {
          console.error('Error adding staff member:', err);
          alert('Failed to add Item!');
        },
      });
    }

    onCancel(): void {
      this.dialogRef.close(); // Close the dialog
    }


}
