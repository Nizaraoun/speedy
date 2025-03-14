import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SpecificTripService } from 'src/app/FrontOffices/services/specific-trip/specific-trip.service';

@Component({
  selector: 'app-specific-trip-form',
  templateUrl: './specific-trip-form.component.html',
  styleUrls: ['./specific-trip-form.component.css']
})
export class SpecificTripFormComponent {
  isSubmitting = false;

  constructor(
    private specificTripService: SpecificTripService,
    private router: Router
  ) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.isSubmitting = true;
      
      const tripData = form.value;
      const fileInput = document.getElementById('photo') as HTMLInputElement;
      const file = fileInput && fileInput.files ? fileInput.files[0] : undefined;
      
      this.specificTripService.createTripLegacy(tripData, file).subscribe({
        next: (response) => {
          console.log('Trip created successfully', response);
          this.isSubmitting = false;
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error creating trip', error);
          this.isSubmitting = false;
        }
      });
    } else {
      console.log('Form is invalid:', form.errors);
    }
  }
}
