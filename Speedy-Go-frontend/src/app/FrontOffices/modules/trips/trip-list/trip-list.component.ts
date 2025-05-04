import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { SpecificTripService } from 'src/app/FrontOffices/services/specific-trip/specific-trip.service';
import { SpecificTrip } from 'src/app/FrontOffices/models/specific-trip.model';
import { Router } from '@angular/router';
import { Trip } from '../model/trip';
import { TripService } from '../trip/trip.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];
  specificTrips: SpecificTrip[] = [];
  filteredTrips: Trip[] = []; // Added for filtered trips
  loading = true;
  error: string | null = null;
  tripToDelete: Trip | null = null;
  isDeleting = false;
  deleteModal: Modal | null = null;
  searchTerm: string = ''; // Added for search functionality
  activeFilter: string = 'all'; // Added for filtering

  constructor(private tripService: TripService, private specificTripService: SpecificTripService, private router: Router) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  ngAfterViewInit(): void {
    // Initialize the modal
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      this.deleteModal = new Modal(modalElement);
    }
  }

  loadTrips(): void {
    this.loading = true;
    this.error = null;

    this.tripService.getTrips().subscribe({
      next: (data: Trip[]) => {
        this.trips = data;
        // Add expanded property to each trip for UI interaction
        this.trips.forEach(trip => {
          (trip as any).expanded = false;
        });
        this.filteredTrips = [...this.trips]; // Initialize filtered trips
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error fetching trips', err);
        this.error = 'Failed to load trips. Please try again later.';
        this.loading = false;
      }
    });

    this.loadSpecificTrips();
  }

  loadSpecificTrips(): void {
    this.specificTripService.getAllTrips().subscribe({
      next: (data: SpecificTrip[]) => {
        console.log('Specific trips loaded', data);
        this.specificTrips = data;
        // Add expanded property to each specific trip for UI interaction
        this.specificTrips.forEach(trip => {
          (trip as any).expanded = false;
        });
      },
      error: (err: any) => {
        console.error('Error fetching specific trips', err);
      }
    });
  }

  // Method to filter trips based on status
  filterTrips(filterType: string): void {
    this.activeFilter = filterType;
    
    if (filterType === 'all') {
      this.filteredTrips = [...this.trips];
    } else if (filterType === 'active') {
      this.filteredTrips = this.trips.filter(trip => 
        trip.trip_status === 'matin' || trip.trip_status === 'apres_mdi'
      );
    } else if (filterType === 'completed') {
      this.filteredTrips = this.trips.filter(trip => trip.trip_status === 'soiree');
    } else if (filterType === 'cancelled') {
      this.filteredTrips = this.trips.filter(trip => trip.trip_status === 'aucun');
    }
    
    // Apply search term if exists
    if (this.searchTerm) {
      this.applySearch();
    }
  }
  
  // Method to apply search term to filtered trips
  applySearch(): void {
    const term = this.searchTerm.toLowerCase();
    if (!term) {
      this.filterTrips(this.activeFilter);
      return;
    }
    
    this.filteredTrips = this.filteredTrips.filter(trip => 
      trip.description.toLowerCase().includes(term) || 
      trip.start_location.toLowerCase().includes(term) || 
      trip.end_location.toLowerCase().includes(term)
    );
  }
  
  // Method to reload trips (for error state)
  reloadTrips(): void {
    this.loadTrips();
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'matin':
        return 'bg-info';
      case 'apres_mdi':
        return 'bg-warning';
      case 'soiree':
        return 'bg-success';
      case 'aucun':
        return 'bg-danger';
      default:
        return 'bg-primary';
    }
  }

  getStatusDisplayText(status: string): string {
    switch (status) {
      case 'matin':
        return 'Matin (8h - 12h)';
      case 'apres_mdi':
        return 'Apres Midi (12h - 17h)';
      case 'soiree':
        return 'Soirée (17h - 21h)';
      case 'aucun':
        return 'Aucun';
      default:
        return status;
    }
  }

  confirmDelete(trip: Trip | SpecificTrip): void {
    if ('start_location' in trip && 'end_location' in trip && 'trip_date' in trip) {
      this.tripToDelete = trip;
      this.deleteModal?.show();
    } else {
      console.error('Invalid trip type for deletion');
    }
  }

  deleteTrip(): void {
    if (!this.tripToDelete || !this.tripToDelete.id) return;

    this.isDeleting = true;
    this.tripService.deleteTrip(this.tripToDelete.id).subscribe({
      next: () => {
        this.trips = this.trips.filter(t => t.id !== this.tripToDelete?.id);
        this.filteredTrips = this.filteredTrips.filter(t => t.id !== this.tripToDelete?.id);
        this.isDeleting = false;
        this.deleteModal?.hide();
        this.tripToDelete = null;
      },
      error: (err: any) => {
        console.error('Error deleting trip', err);
        this.isDeleting = false;
        this.deleteModal?.hide();
        this.error = 'Failed to delete trip. Please try again later.';
      }
    });
  }

  viewSpecificTripDetails(id: number): void {
    this.router.navigate(['/specific-trip-detail', id]);
  }
}