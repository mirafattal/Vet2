import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { APIClient, AppoiAnimalNameDto, GetAppointmentByDateDto, GetStaffNamesdto, StaffWithRoleDTO } from '@shared/services/api-client/veterinary-api.service';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { BaseToken, TokenService } from '@core';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatTabsModule,
    MatIconModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [DatePipe, provideNativeDateAdapter()],
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  todayDate: string = '';
appointAnimalThisWeek: AppoiAnimalNameDto[] = [];
appointAnimalThisMonth: AppoiAnimalNameDto[] = [];
appointAnimalNextMonth: AppoiAnimalNameDto[] = [];
selectedTimeRange: string = 'thisWeek';  // Default selection is 'thisWeek'
filteredAppointments: AppoiAnimalNameDto[] = [];

doctorNames: StaffWithRoleDTO[] = [];
staffWithRoles: StaffWithRoleDTO[] = [];
StaffName: GetStaffNamesdto[] = []; // Initialize as an empty array by default
staffList: GetStaffNamesdto[] = [];
selectedStaffId: number | undefined |null = null; // Declare the selectedStaffId with a default value (null)


getAppointmentsThisWeek() {
  const staffId = this.staffId; // Ensure staffId is fetched and assigned earlier

  if (!staffId) {
    console.error('Staff ID is not available. Cannot fetch appointments.');
    return;
  }
  this.apiService.getAnimalAndAppoinThisWeek().subscribe((appointAnimal: AppoiAnimalNameDto[]) => {
    console.log(appointAnimal);
    this.appointAnimalThisWeek = appointAnimal;

    // Filter by staffId before sorting
    this.appointAnimalThisWeek = this.appointAnimalThisWeek.filter(
      (appointment) => appointment.staffId === staffId
    );

    this.appointAnimalThisWeek.sort((a, b) => {
      const dateA = a.appointmentDate ? new Date(a.appointmentDate) : new Date(0); // Default to epoch if undefined
      const dateB = b.appointmentDate ? new Date(b.appointmentDate) : new Date(0); // Default to epoch if undefined
      return dateA.getTime() - dateB.getTime(); // Ascending order
    });

    appointAnimal.forEach(appointAnimal => {
        console.log('Animal Name:', appointAnimal.animalName);
        console.log('Owner Name:', appointAnimal.fullName);
        console.log('Slot Time:', appointAnimal.slotStartTime);
    });
  });
}

getAppointmentsThisMonth() {
  const staffId = this.staffId; // Ensure staffId is fetched and assigned earlier

  if (!staffId) {
    console.error('Staff ID is not available. Cannot fetch appointments.');
    return;
  }
  this.apiService.getAnimalAndAppoinThisMonth().subscribe((appointAnimal: AppoiAnimalNameDto[]) => {
    console.log(appointAnimal);
    this.appointAnimalThisMonth = appointAnimal;

    this.appointAnimalThisMonth = this.appointAnimalThisMonth.filter(
      (appointment) => appointment.staffId === staffId
    );

    this.appointAnimalThisMonth.sort((a, b) => {
      // Sort by appointmentDate first
      const dateA = a.appointmentDate ? new Date(a.appointmentDate) : new Date(0);
      const dateB = b.appointmentDate ? new Date(b.appointmentDate) : new Date(0);

      if (dateA.getTime() !== dateB.getTime()) {
        return dateA.getTime() - dateB.getTime(); // Ascending order by date
      }

      // If appointmentDate is the same, sort by slotStartTime (time comparison)
      const [hourA, minuteA] = a.slotStartTime ? a.slotStartTime.split(':').map(Number) : [0, 0];
      const [hourB, minuteB] = b.slotStartTime ? b.slotStartTime.split(':').map(Number) : [0, 0];

      // Compare hours first
      if (hourA !== hourB) {
        return hourA - hourB; // Ascending order by hour
      }
      console.log(`Comparing times: ${hourA}:${minuteA} vs ${hourB}:${minuteB}`);
      // If hours are the same, compare minutes
      return minuteA - minuteB; // Ascending order by minute

    });


  });
}

getAppointmentsNextMonth() {
  const staffId = this.staffId; // Ensure staffId is fetched and assigned earlier

  if (!staffId) {
    console.error('Staff ID is not available. Cannot fetch appointments.');
    return;
  }

  this.apiService.getAnimalAndAppoinNextMonth().subscribe({
    next: (appointAnimal: AppoiAnimalNameDto[]) => {
      // Store all next month's appointments
      this.appointAnimalNextMonth = appointAnimal;

      // Filter appointments for the current staffId
      this.appointAnimalNextMonth = this.appointAnimalNextMonth.filter(
        (appointment) => appointment.staffId === staffId
      );

      // Sort appointments by appointmentDate
      this.appointAnimalNextMonth.sort((a, b) => {
        const dateA = a.appointmentDate ? new Date(a.appointmentDate) : new Date(0); // Default to epoch if undefined
        const dateB = b.appointmentDate ? new Date(b.appointmentDate) : new Date(0); // Default to epoch if undefined
        return dateA.getTime() - dateB.getTime(); // Ascending order
      });

      // Log details for debugging
      this.appointAnimalNextMonth.forEach((appointment) => {
        console.log('Animal Name:', appointment.animalName);
        console.log('Owner Name:', appointment.fullName);
        console.log('Slot Time:', appointment.slotStartTime);
      });
    },
    error: (error) => {
      console.error('Failed to fetch appointments:', error);
    },
  });
}

// getStaffNames() {
//   this.apiService.staffwithroles().subscribe((staff: StaffWithRoleDTO[]) => {
//     //console.log('Staff data received:', staff); // Debug log
//     // Filter the staff to include only 'Pet Doctor' or 'Horse Doctor'
//     this.staffList = staff.filter(
//       (s) => s.roleName === 'Pet Doctor' || s.roleName === 'Horse Doctor'
//     );

//     // Set the selected staff to the first doctor if available
//     this.selectedStaffId = this.staffList.length > 0 ? this.staffList[0].staffId : null;

//     // Fetch appointments for the selected staff
//     this.fetchAppointmentsbyDate();
//   });
// }


constructor(private dialog: MatDialog, private apiService: APIClient, private tokenService: TokenService) {}

roles: string[] = [];
ngOnInit(): void {
  this.todayDate = new Date().toUTCString(); // Display today's UTC date dynamically
  //this.getStaffNamesFordate();

  //this.getStaffNames();


  const token: BaseToken = this.tokenService.get()!; // Assuming you get the BaseToken
  console.log('Token:', token);

  if (token?.access_token) {
    // Decode the access token (this should only decode the JWT string)
    const decodedToken: any = this.tokenService.decodeToken(token.access_token); // Decode the access_token
    console.log('Decoded Token:', decodedToken);

    // Access the 'Roles' from token.attributes (not directly from the token)
    if (token?.attributes?.Roles) {
      // If Roles is a string, convert it to an array
      this.roles = Array.isArray(token.attributes.Roles) ? token.attributes.Roles : [token.attributes.Roles];
    } else {
      this.roles = [];
    }

    console.log('Roles:', this.roles);
  } else {
    console.log('No token found');
    this.roles = [];
  }

  const userId = this.tokenService.getUserId();
  console.log('userId:', userId)
  if (userId) {
    this.fetchStaffId(userId);
  } else {
    console.error('User ID is not available.');
  }

}

staffId!: number;
fetchStaffId(userId: number): void {
  this.apiService.getStaffByUserId(userId).subscribe({
    next: (response) => {
      this.staffId = response.staffId!;
      this.getAppointmentsThisWeek();
      this.getAppointmentsThisMonth();
      this.getAppointmentsNextMonth();
      this.fetchAppointmentsbyDate();
      console.log('Staff ID:', this.staffId);
    },
    error: (error) => {
      console.error('Failed to fetch staff ID:', error);
    },
  });
}

// Filter appointments based on selected time range
filterAppointments() {
  switch (this.selectedTimeRange) {
    case 'thisWeek':
      this.filteredAppointments = this.appointAnimalThisWeek;
      break;
    case 'thisMonth':
      this.filteredAppointments = this.appointAnimalThisMonth;
      break;
    case 'nextMonth':
      this.filteredAppointments = this.appointAnimalNextMonth;
      break;
    default:
      this.filteredAppointments = this.appointAnimalThisWeek;
  }

  // Filter by staffId retrieved earlier
  if (this.staffId) {
    this.filteredAppointments = this.filteredAppointments.filter(
      (appointment) => appointment.staffId === this.staffId
    );
  }
}




  selectedDate: Date = new Date();
  AppointsbyDate: GetAppointmentByDateDto[] = [];
  timeSlots = Array.from({ length: 8 }, (_, i) => ({
    time: `${9 + i}:00`,  // Time slots from 9:00 to 16:00
    appointment: null as {
      animalName: string | null,
      ownerName: string | null,
      doctorName: string | null,
      appointmentReason: string | null
    } | null
  }));
  isLoading: boolean = false; // Add this property to manage loading state
  errorMessage: string | null = null; // Add this property to handle errors

  // Getter to check if all time slots are empty
  get noAppointments(): boolean {
    return this.timeSlots.every(slot => !slot.appointment);
  }

  // getStaffNamesFordate() {
  //   this.apiService.staffwithroles().subscribe((staff: StaffWithRoleDTO[]) => {
  //     //console.log('Staff data received:', staff); // Debug log
  //     // Filter the staff to include only 'Pet Doctor' or 'Horse Doctor'
  //     this.staffList = staff.filter(
  //       (s) => s.roleName === 'Pet Doctor' || s.roleName === 'Horse Doctor'
  //     );

  //     // Set the selected staff to the first doctor if available
  //     this.selectedStaffId = this.staffList.length > 0 ? this.staffList[0].staffId : null;

  //     // Fetch appointments for the selected staff
  //     this.fetchAppointmentsbyDate();
  //   });
  // }


  fetchAppointmentsbyDate() {
    console.log('Fetching appointments for date:', this.selectedDate); // Debug log
    this.isLoading = true;
    this.errorMessage = null;

    this.apiService.getAppointmentByDate(this.selectedDate).subscribe({
      next: (appointments) => {
        //console.log('Appointments received:', appointments); // Debug log
        this.isLoading = false;
        this.timeSlots = Array.from({ length: 8 }, (_, i) => ({
          time: `${9 + i}:00`,
          appointment: null
        }));

        if (appointments && appointments.length > 0) {
          const filteredAppointments = this.selectedStaffId
            ? appointments.filter(appointment => appointment.staffId === this.selectedStaffId)
            : appointments;

          console.log('Filtered appointments:', filteredAppointments); // Debug log

          for (const appointment of filteredAppointments) {
            const slot = this.timeSlots.find(
              (s) => s.time === this.formatTime(appointment.slotStartTime)
            );
            if (slot) {
              slot.appointment = {
                animalName: appointment.animalName ?? null,
                ownerName: appointment.fullName ?? null,
                doctorName: appointment.staffName ?? null,
                appointmentReason: appointment.appointmentReason ?? null
              };
            }
          }
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to fetch appointments. Please try again later.';
        console.error('Failed to fetch appointments', err);
      }
    });
  }

  // Format time from backend (e.g., "09:00:00") to match slot format ("9:00")
  formatTime(slotStartTime: string | undefined): string {
    if (!slotStartTime) return '';
    // Ensure the time is in the same format as timeSlots (e.g., "09:00")
    const time = new Date(`1970-01-01T${slotStartTime}Z`);
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  // Navigate to the previous date and fetch appointments
  previousDate() {
    console.log('Navigating to previous date'); // Debug log
    this.selectedDate.setDate(this.selectedDate.getDate() - 1);
    this.selectedDate = new Date(this.selectedDate);
    this.fetchAppointmentsbyDate();
  }

  // Navigate to the next date and fetch appointments
  nextDate() {
    console.log('Navigating to next date'); // Debug log
    this.selectedDate.setDate(this.selectedDate.getDate() + 1);
    this.selectedDate = new Date(this.selectedDate);
    this.fetchAppointmentsbyDate();
  }

  filterAppointmentsForSchedule() {
    console.log('Filtering appointments for staff ID:', this.selectedStaffId); // Debug log
    this.fetchAppointmentsbyDate();  // Re-fetch appointments when a staff is selected
  }

// Fetch appointments based on the selected date
onDateChange() {
  console.log('Selected Date:', this.selectedDate); // Debug log
  this.fetchAppointmentsbyDate();
}

}
