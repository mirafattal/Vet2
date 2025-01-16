import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIClient, StaffDto, StaffRoleDto, StaffRoleDtoIEnumerableApiResponse } from '@shared/services/api-client/veterinary-api.service';

@Component({
  selector: 'app-edit-staff-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './edit-staff-dialog.component.html',
  styleUrls: ['./edit-staff-dialog.component.scss']
})
export class EditStaffDialogComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<EditStaffDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, // Data passed from parent component
      private apiService: APIClient, // Injecting the OwnerService
      private snackBar: MatSnackBar
    ) {
       // Initialize the staffwithRole with the data passed into the dialog
    this.staffwithRole = { ...this.data.staff };
    // Fetch staff roles if not already available in `data.staffRoles`
    this.staffRoles = this.data.staffRoles || [];
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    staffwithRole: StaffDto;
    staffRoles: StaffRoleDto[] = []; // Initialize as an empty array by default
    staffControl = new FormControl();

    openSnackBar(message: string, type: 'success' | 'error' | 'warning' | 'info') {
      const panelClass = `custom-snackbar-${type}`;
      this.snackBar.open(message, 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: [panelClass]
      });
    }

    saveChanges(): void {
      // Call the API to update staff details
      this.apiService.update13(this.staffwithRole).subscribe({
        next: (response) => {
          console.log('Staff updated successfully:', response);
          this.openSnackBar('Staff updated successfully!', 'success');
          this.dialogRef.close(this.staffwithRole); // Close dialog with updated staff
        },
        error: (err) => {
          console.error('Error updating staff:', err);
          this.openSnackBar('Failed to update staff details.', 'error');
        }
      });
    }


    ngOnInit() {
      // Get all animal types from the backend
      this.apiService.getAll14().subscribe((response: StaffRoleDtoIEnumerableApiResponse) => {
      this.staffRoles = response.data ?? [];
      });
    }

}
