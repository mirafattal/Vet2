import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIClient, InvoiceDto } from '@shared/services/api-client/veterinary-api.service';

@Component({
  selector: 'app-edit-invoice',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    MatDatepickerModule
  ],
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss']
})
export class EditInvoiceComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<EditInvoiceComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, // Data passed from parent component
      private apiService: APIClient,// Injecting the OwnerService
      private snackBar: MatSnackBar
    ) {
      console.log('Received data in dialog:', data);
    }

    onNoClick(): void {
      this.dialogRef.close();
    }



saveChanges(): void {
  console.log('Before saving:', this.data);

  // Check if this.data is defined
  if (!this.data) {
    console.error('Error: data is missing or undefined.');
    this.snackBar.open('Data is missing. Please try again.', 'Close', { duration: 3000 });
    return;
  }

  // Convert invoices object to an array
  const invoicesArray = Object.values(this.data.invoices) as InvoiceDto[]; // Assert the type here

  // Check if invoicesArray is defined and has elements
  if (!Array.isArray(invoicesArray) || invoicesArray.length === 0) {
    console.error('Error: invoices is missing or empty.');
    this.snackBar.open('Invoices are missing or empty. Please try again.', 'Close', { duration: 3000 });
    return;
  }

  // Access the first invoice in the `invoicesArray`
  const firstInvoice = invoicesArray[0]; // Access the first _InvoiceDto

  // Use type assertion to ensure TypeScript knows the type
  const invoiceId = firstInvoice?.invoiceId; // Use optional chaining to safely access invoiceId

  if (!invoiceId) {
    console.error('Error: invoiceId is missing or undefined.');
    this.snackBar.open('Invoice ID is missing. Please try again.', 'Close', { duration: 3000 });
    return;
  }

  // Create the updated data object with the necessary fields
  const updatedData = {
    invoiceId: invoiceId,
    ownerName: this.data.ownerName,
    ownerNumber: this.data.ownerNumber,
    totalAmount: this.data.totalAmount,
    paymentDate: this.data.paymentDate,
  } as InvoiceDto;

  console.log('Sending updated data:', updatedData);

  // Call the API service's update method
  this.apiService.update9(updatedData).subscribe({
    next: (updatedInvoice) => {
      this.snackBar.open('Invoice updated successfully!', 'Close', { duration: 3000 });
      this.dialogRef.close(updatedInvoice);
      console.log('Invoice record successfully updated:', updatedInvoice);
    },
    error: (err) => {
      console.error('Error updating invoice record:', err);
      this.snackBar.open('Error updating invoice. Please try again.', 'Close', { duration: 3000 });
    },
  });
}


    ngOnInit() {

      console.log('Data received in dialog:', this.data);
console.log('Invoices:', this.data.invoices);
    }

}
