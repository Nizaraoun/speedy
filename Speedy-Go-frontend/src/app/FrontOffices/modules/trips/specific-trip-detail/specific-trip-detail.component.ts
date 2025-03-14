import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecificTripService } from 'src/app/FrontOffices/services/specific-trip/specific-trip.service';
import { SpecificTrip } from 'src/app/FrontOffices/models/specific-trip.model';
import * as bootstrap from 'bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-specific-trip-detail',
  templateUrl: './specific-trip-detail.component.html',
  styleUrls: [
    './specific-trip-detail.component.css'
  ]
})
export class SpecificTripDetailComponent implements OnInit {
  specificTrip: SpecificTrip | null = null;
  loading = true;
  error: string | null = null;
  updateTripForm: FormGroup; // Renamed to avoid conflict

  constructor(
    private route: ActivatedRoute, 
    private specificTripService: SpecificTripService, 
    private router: Router, 
    private fb: FormBuilder
  ) {
    // Initialize form in constructor
    this.updateTripForm = this.fb.group({
      description: ['', Validators.required],
      departureLocation: ['', Validators.required],
      arrivalLocation: ['', Validators.required],
      departureDate: ['', Validators.required],
      arrivalDate: ['', Validators.required],
      departureTime: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      parcelType: ['', Validators.required],
      receiverFullName: ['', Validators.required],
      receiverPhoneNumber: ['', Validators.required],
      parcelDescription: ['', Validators.required],
      parcelHeight: ['', Validators.required],
      parcelWidth: ['', Validators.required],
      parcelLength: ['', Validators.required],
      photo: ['', Validators.required],
      tripDetails: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadSpecificTripDetails(+id);
    }
  }

  loadSpecificTripDetails(id: number): void {
    this.specificTripService.getTripById(id).subscribe({
      next: (data: SpecificTrip) => {
        this.specificTrip = data;
        this.loading = false;
        // Populate the form with existing trip data
        this.populateUpdateForm();
        console.log('Specific trip loaded', this.specificTrip.photo);
      },
      error: (err: any) => {
        console.error('Error fetching specific trip details', err);
        this.error = 'Failed to load trip details. Please try again later.';
        this.loading = false;
      }
    });
  }

  // New method to populate the form with existing data
  populateUpdateForm(): void {
    if (this.specificTrip) {
      this.updateTripForm.patchValue({
        description: this.specificTrip.description,
        departureLocation: this.specificTrip.departureLocation,
        arrivalLocation: this.specificTrip.arrivalLocation,
        departureDate: this.specificTrip.departureDate,
        arrivalDate: this.specificTrip.arrivalDate,
        departureTime: this.specificTrip.departureTime,
        arrivalTime: this.specificTrip.arrivalTime,
        parcelType: this.specificTrip.parcelType,
        receiverFullName: this.specificTrip.receiverFullName,
        receiverPhoneNumber: this.specificTrip.receiverPhoneNumber,
        parcelDescription: this.specificTrip.parcelDescription,
        parcelHeight: this.specificTrip.parcelHeight,
        parcelWidth: this.specificTrip.parcelWidth,
        parcelLength: this.specificTrip.parcelLength,
        photo: this.specificTrip.photo,
        tripDetails: this.specificTrip.tripDetails
      });
    }
  }

  // Method to show update modal
  showUpdateModal(): void {
    const modalElement = document.getElementById('updateTripModal');
    if (modalElement) {
      const updateModal = bootstrap.Modal.getOrCreateInstance(modalElement);
      updateModal.show();
    } else {
      console.error('Modal element not found');
    }
  }

  // Method to handle form submission
  updateTrip(): void {
    if (this.updateTripForm.valid && this.specificTrip) {
      const updatedTrip = {
        ...this.specificTrip,
        ...this.updateTripForm.value
      };
      
      // Make sure we're using the numeric ID
      this.specificTripService.updateTrip(updatedTrip ).subscribe({
        next: () => {
          // Close modal and reload page
          const modalElement = document.getElementById('updateTripModal');
          if (modalElement) {
            const updateModal = bootstrap.Modal.getInstance(modalElement);
            if (updateModal) {
              updateModal.hide();
            }
          }
          // Reload trip details
          this.loadSpecificTripDetails(this.specificTrip!.id);
        },
        error: (err: any) => {
          console.error('Error updating trip', err);
          this.error = 'Failed to update trip. Please try again later.';
        }
      });
    }
  }
  deleteTrip(): void {
    if (this.specificTrip) {
      this.specificTripService.deleteTrip(this.specificTrip.id).subscribe({
        next: () => {
          const modalElement = document.getElementById('deleteConfirmModal');
          if (modalElement) {
            const deleteModal = bootstrap.Modal.getInstance(modalElement);
            if (deleteModal) {
              deleteModal.hide();
            }
          }
          
          const modalBackdrops = document.querySelectorAll('.modal-backdrop');
          modalBackdrops.forEach(backdrop => {
            document.body.classList.remove('modal-open');
            backdrop.remove();
          });
          
          this.router.navigate(['/trips']);
        },
        error: (err: any) => {
          console.error('Error deleting trip', err);
          this.error = 'Failed to delete trip. Please try again later.';
        }
      });
    }
  }}