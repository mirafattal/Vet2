import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { APIClient, InvoiceDto } from '@shared/services/api-client/veterinary-api.service';
import { CommonModule } from '@angular/common';
import { AddDollarPipe } from '@shared/pipes/add-dollar.pipe';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-Invoice',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule,
    RouterModule,
    MatIconModule,
    AddDollarPipe,
    MatPaginatorModule,
    CommonModule,
    FormsModule,
  ],

  templateUrl: './Invoice.component.html',
  styleUrls: ['./Invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

invoice: InvoiceDto[] = [];
displayedColumns = ['OwnerName', 'OwnerNumber', 'TotalAmount', 'PaymentDate', 'actions'];
dataSource = new MatTableDataSource<any>([]); // Initialize with an empty array
itemId: number | null = null;
totalCounts: number = 0; // Total items in the database
pageSize: number = 10; // Number of items per page
pageIndex: number = 0; // Current page index
searchTerm: string = '';

constructor(private apiService: APIClient, private router: Router,
private route: ActivatedRoute, private snackBar: MatSnackBar, private diaglog: MatDialog) {}

ngOnInit(): void {
  this.dataSource.filterPredicate = (data: any, filter: string) => {
  const filterValue = filter.trim().toLowerCase();
    return (
   data.ownerName.toLowerCase().includes(filterValue)
  );
   }
 //this.fetchData();
 this.loadInvoices();
}



         applyFilter(event: Event): void {
           const filterValue = (event.target as HTMLInputElement).value;
           this.dataSource.filter = filterValue.trim().toLowerCase();
         }

         openEditInvoiceDialog(invoice: InvoiceDto[]) {
          const dialogRef = this.dialog.open(EditInvoiceComponent, {
            data: {
              invoices: {...this.invoice}
            }
          });

          dialogRef.afterClosed().subscribe(result => {
            // Handle the result if needed
          });
        }

         onDelete(row: any): void {
           const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                 width: '400px', // Set the desired width here
                 height: '200px'
               });

               dialogRef.afterClosed().subscribe(result => {
                 if (result) {

           // Call the backend service to delete the owner and animal
           this.apiService.deleteById9(row.invoiceId).subscribe({
             next: (response) => {
               console.log('Delete successful:', response);
               // Update the UI (remove the row from the table, etc.)
               this.removeRowFromTable(row);
               this.loadInvoices();
               this.snackBar.open('Invoice deleted successfully!', 'Close', { duration: 3000 })
              },
             error: (err) => {
               console.error('Error deleting item:', err);
               alert('Failed to delete the Item!');
                 }})
           }});
         }

         removeRowFromTable(row: any): void {
           // Implement logic to remove the deleted row from your displayed data
           const index = this.invoice.findIndex(item => item.invoiceId === row.itemId);
           if (index !== -1) {
             this.invoice.splice(index, 1);  // Remove the row from your data array
            }
          }


    readonly dialog = inject(MatDialog);
     openDialog() {
     this.dialog.open(AddInvoiceComponent, {
       disableClose: true, // Prevents closing on outside click or Escape key
        });
     }


     loadInvoices(): void {
      // Fetch invoices from the backend
      this.apiService
        .getInvoicesPaginated(this.pageIndex + 1, this.pageSize)
        .subscribe((response: any) => {
          this.invoice = response.data; // Update the invoices
          this.totalCounts = response.totalItems; // Update the total number of items
        });
    }


    page: number = 1;

    loadSearch(): void {
      // If searchTerm is empty or null, explicitly set it to null to fetch all invoices
  const search = this.searchTerm?.trim() || null;
      this.apiService.searchInvoice(search!, this.page, this.pageSize).subscribe({
        next: (response) => {
          if (response && response.data) {
            this.invoice = response.data;
            this.totalCounts = response.totalRecords!;
          } else {
            this.invoice = [];
            this.totalCounts = 0;
          }
          if (search == null) {
            console.error("searchTerm cannot be null");
            return this.loadInvoices(); // Call fetchData() if searchTerm is null
        }
        },
        error: (error) => {
          console.error('Failed to load invoices:', error);
          this.invoice = [];
          this.totalCounts = 0;
        }
      });
    }

    onSearch(): void {
      this.page = 1; // Reset to first page on search
      this.loadSearch();
    }

     // Method to handle page change for both search and regular pagination
    onPageChange(event: any): void {
    // Check if we are in search mode or regular pagination mode
    if (this.searchTerm) {
      // If search term exists, we are in search mode
      this.page = event.pageIndex + 1; // +1 to adjust for 0-based index
    } else {
      // Regular pagination
      this.pageIndex = event.pageIndex; // Update the current page index
      this.pageSize = event.pageSize; // Update the page size
      this.page = event.pageIndex + 1; // +1 to adjust for 0-based index
    }

    this.loadInvoices(); // Reload invoices based on the new page
    this.loadSearch();
  }
}
