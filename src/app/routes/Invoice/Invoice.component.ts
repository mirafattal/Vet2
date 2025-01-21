import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
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
import { MatPaginatorModule, PageEvent, MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { HttpParams } from '@angular/common/http';


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
private route: ActivatedRoute,) {}

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

         fetchData(){
         this.apiService.getAll9().subscribe(
           (response) => {
           this.invoice = response.data ?? []; // Directly replace with the API response
           this.dataSource.data = this.invoice;
           console.log('Invoice Details:', this.invoice);
                 },
         (error) => {
         console.error('Error fetching invoice details', error);
          }
        );
     }



         applyFilter(event: Event): void {
           const filterValue = (event.target as HTMLInputElement).value;
           this.dataSource.filter = filterValue.trim().toLowerCase();
         }

         onEdit(row: any): void {
           console.log('Edit action clicked for:', row);
           // Add logic to edit details
         }

         onDelete(row: any): void {
           console.log('Item ID to delete:', row.itemId); // Log the ownerId
           console.log('Delete action clicked for:', row);

           // Confirm the deletion action (optional)
           const confirmDelete = window.confirm(`Are you sure you want to delete ${row.itemName}?`);
           if (!confirmDelete) {
             return; // If user cancels, do nothing
           }

           // Call the backend service to delete the owner and animal
           this.apiService.deleteById9(row.itemId).subscribe({
             next: (response) => {
               console.log('Delete successful:', response);
               // Update the UI (remove the row from the table, etc.)
               this.removeRowFromTable(row);
               alert('Item has been deleted successfully!');
             },
             error: (err) => {
               console.error('Error deleting item:', err);
               alert('Failed to delete the Item!');
             }
           });
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
    // loadSearch(): void {
    //   this.apiService.searchInvoice(this.searchTerm, this.page, this.pageSize).subscribe((data) => {
    //     this.invoice! = data.data!;
    //     this.totalCounts! = data.totalRecords!;
    //   });
    // }

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
