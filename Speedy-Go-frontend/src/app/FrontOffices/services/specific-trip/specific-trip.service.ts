import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpecificTrip } from '../../models/specific-trip.model';

@Injectable({
  providedIn: 'root'
})
export class SpecificTripService {
  private readonly API_URL = 'http://localhost:8084/api/specific-trips';
  
    constructor(private http: HttpClient) {}
  
    private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    }

  getTripById(id: number): Observable<SpecificTrip> {
    return this.http.get<SpecificTrip>(`${this.API_URL}/${id}`, { headers: this.getHeaders() });
  }

  getAllTrips(): Observable<SpecificTrip[]> {
    return this.http.get<SpecificTrip[]>(this.API_URL, { headers: this.getHeaders() });
  }

  
  createTripLegacy(trip: any): Observable<any> {
    console.log('Creating trip:', trip);
    return this.http.post(`${this.API_URL}/create`, trip, { headers: this.getHeaders() });
  }

  updateTrip(id: number, trip: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, trip, { headers: this.getHeaders() });
  }

  deleteTrip(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`, { headers: this.getHeaders() });
  }

  getTripsByDestination(destination: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/search/destination/${destination}`, { headers: this.getHeaders() });
  }

  getTripsByVehicleType(vehicleType: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/search/vehicle-type/${vehicleType}`, { headers: this.getHeaders() });
  }

  getTripsByPrice(price: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/search/price/${price}`, { headers: this.getHeaders() });
  }

  getTripsByDepartureDate(date: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/search/departure-date/${date}`, { headers: this.getHeaders() });
  }
}
