import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { Trip, TripService } from '../trip/trip.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css']
})
export class TripDetailComponent implements OnInit, AfterViewInit {
  trip: Trip | null = null;
  loading = true;
  error: string | null = null;
  isDeleting = false;
  deleteModal: Modal | null = null;
  editModal: Modal | null = null;
  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      destination: ['', Validators.required],
      start_location: ['', Validators.required],
      end_location: ['', Validators.required],
      trip_date: ['', Validators.required],
      trip_status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.loadTrip();
    });
  }

  ngAfterViewInit(): void {
    // Initialize the delete modal
    const deleteModalElement = document.getElementById('deleteModal');
    if (deleteModalElement) {
      this.deleteModal = new Modal(deleteModalElement);
    }

    // Initialize the edit modal
    const editModalElement = document.getElementById('editModal');
    if (editModalElement) {
      this.editModal = new Modal(editModalElement);
    }
  }

  loadTrip(): void {
    this.loading = true;
    this.error = null;
    
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    if (isNaN(id)) {
      this.error = 'Invalid trip ID';
      this.loading = false;
      return;
    }

    this.tripService.getTrip(id).subscribe({
      next: (data) => {
        this.trip = data;
        this.editForm.patchValue(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching trip details', err);
        this.error = 'Failed to load trip details. Please try again later.';
        this.loading = false;
      }
    });
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'PLANNED':
        return 'bg-info';
      case 'IN_PROGRESS':
        return 'bg-warning';
      case 'COMPLETED':
        return 'bg-success';
      case 'CANCELLED':
        return 'bg-secondary';
      default:
        return 'bg-primary';
    }
  }

  confirmDelete(): void {
    this.deleteModal?.show();
  }

  deleteTrip(): void {
    if (!this.trip || !this.trip.id) return;
    
    this.isDeleting = true;
    
    this.tripService.deleteTrip(this.trip.id).subscribe({
      next: () => {
        this.isDeleting = false;
        this.deleteModal?.hide();
        this.router.navigate(['/trips']);
      },
      error: (err) => {
        console.error('Error deleting trip', err);
        this.isDeleting = false;
        // Could add a toast notification here
        this.error = 'Failed to delete trip. Please try again later.';
      }
    });
  }

  openEditDialog(): void {
    if (!this.trip) return;

    // Set the trip data in the modal
    const tripDataElement = document.getElementById('editTripData');
    if (tripDataElement) {
      tripDataElement.innerText = JSON.stringify(this.trip, null, 2);
    }

    this.editModal?.show();
  }

  saveEdit(): void {
    if (this.editForm.valid) {
      if (this.trip) {
        const updatedTrip: Trip = { ...this.trip, ...this.editForm.value };
        this.tripService.updateTrip(updatedTrip, this.editForm.value).subscribe({
        next: () => {
          this.editModal?.hide();
          this.loadTrip();
        },
        error: (err) => {
          console.error('Error updating trip', err);
          // Could add a toast notification here
          this.error = 'Failed to update trip. Please try again later.';
        }
      });
      }
    }
  }
}