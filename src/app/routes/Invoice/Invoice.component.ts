import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { APIClient } from '@shared/services/api-client/veterinary-api.service';


@Component({
  selector: 'app-Invoice',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './Invoice.component.html',
  styleUrls: ['./Invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {

  }



}
