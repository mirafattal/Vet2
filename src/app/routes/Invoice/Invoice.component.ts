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
    AddDollarPipe
  ],
  templateUrl: './Invoice.component.html',
  styleUrls: ['./Invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

invoice: InvoiceDto[] = [];
displayedColumns = ['OwnerName', 'OwnerNumber', 'TotalAmount', 'PaymentDate', 'actions'];
dataSource = new MatTableDataSource<any>([]); // Initialize with an empty array
itemId: number | null = null;

constructor(private apiService: APIClient, private router: Router,
private route: ActivatedRoute,) {}

ngOnInit(): void {
  this.dataSource.filterPredicate = (data: any, filter: string) => {
  const filterValue = filter.trim().toLowerCase();
    return (
   data.ownerName.toLowerCase().includes(filterValue)
  );
   }
 this.fetchData();
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


}
