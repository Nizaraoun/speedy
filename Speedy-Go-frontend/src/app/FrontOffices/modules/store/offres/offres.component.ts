import { Component, OnInit } from '@angular/core';
import { OffersService, Offer } from 'src/app/FrontOffices/services/offres/offre.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class OffresComponent implements OnInit {
  offers: Offer[] = [];
  loading = true;
  error = false;

  constructor(private offersService: OffersService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers(): void {
    this.loading = true;
    const storeId = this.route.snapshot.paramMap.get('id');
    if (storeId) {
      this.offersService.getOffersByStoreId(+storeId).subscribe({
        next: (data) => {
          this.offers = data;
          this.loading = false;
          console.log('Offers loaded', data);
        },
        error: (err) => {
          console.error('Error loading offers', err);
          this.error = true;
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
      this.error = true;
      console.error('No store ID found in the path');
    }
  }

  calculateFinalPrice(offer: Offer): number {
    return offer.price - (offer.price * offer.discount / 100);
  }

  formatDate(dateString: string | null): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}
