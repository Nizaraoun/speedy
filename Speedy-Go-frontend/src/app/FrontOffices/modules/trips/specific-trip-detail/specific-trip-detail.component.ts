import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecificTripService } from 'src/app/FrontOffices/services/specific-trip/specific-trip.service';
import { SpecificTrip } from 'src/app/FrontOffices/models/specific-trip.model';
import * as bootstrap from 'bootstrap';

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

  constructor(private route: ActivatedRoute, private specificTripService: SpecificTripService, private router: Router) {}

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
      },
      error: (err: any) => {
        console.error('Error fetching specific trip details', err);
        this.error = 'Failed to load trip details. Please try again later.';
        this.loading = false;
      }
    });
  }

  updateTrip(): void {
    if (this.specificTrip) {
      const modalElement = document.getElementById('updateTripModal');
      if (modalElement) {
        const updateModal = new bootstrap.Modal(modalElement);
        updateModal.show();
      } else {
        console.error('Modal element not found');
      }
    }
  }

  deleteTrip(): void {
    if (this.specificTrip) {
      this.specificTripService.deleteTrip(this.specificTrip.id).subscribe({
        next: () => {
          this.router.navigate(['/trips']);
        },
        error: (err: any) => {
          console.error('Error deleting trip', err);
          this.error = 'Failed to delete trip. Please try again later.';
        }
      });
    }
  }
}
