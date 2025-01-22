import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';

interface FileParameter {
  data: File;
  fileName: string;
}

@Injectable({
  providedIn: 'root'
})
export class PetadoptionService {

  private apiUrl = 'https://localhost:7175/api/PetForAdoption/ImagePet';

  constructor(private http: HttpClient) {}

  addPetWithImage(petDetails: any, selectedFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('petDto', JSON.stringify(petDetails)); // Append pet details as JSON
    formData.append('posterFile', selectedFile); // Append the image file

    return this.http.post<any>('https://localhost:7175/api/PetForAdoption/ImagePet', formData);
  }

}
