// offers.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Store {
  storeID: number;
}

export interface Offer {
  offre_id: number;
  title: string;
  description: string;
  discount: number;
  image: string;
  price: number;
  category: string;
  date_start: string | null;
  store_name: string;
  available: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  private readonly baseUrl = 'http://localhost:8084/api/offres';
  
  constructor(private http: HttpClient) {}
  
    private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    }
  getAllOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.baseUrl}/all`,{ headers: this.getHeaders() });
  }
  
  getOfferById(id: number): Observable<Offer> {
    return this.http.get<Offer>(`${this.baseUrl}/${id}`,{ headers: this.getHeaders() });
  }
  
  createOffer(offer: Offer, storeId: number): Observable<Offer> {
    return this.http.post<Offer>(`${this.baseUrl}/add/${storeId}`, offer,{ headers: this.getHeaders() });
  }
  
  updateOffer(offer: Offer): Observable<Offer> {
    return this.http.put<Offer>(`${this.baseUrl}/update`, offer,{ headers: this.getHeaders() });
  }
  
  deleteOffer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`,{ headers: this.getHeaders() });
  }
}