// src/app/services/store.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../../modules/store/store/model/store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  
  private readonly API_URL = 'http://localhost:8084/api/stores';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.API_URL}/all`, { headers: this.getHeaders() });
  }

  getStoreById(id: number): Observable<Store> {
    return this.http.get<Store>(`${this.API_URL}/get/${id}`, { headers: this.getHeaders() });
  }

  getStoresByType(type: string): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.API_URL}/type/${type}`, { headers: this.getHeaders() });
  }

  addStore(store: Store): Observable<Store> {
    return this.http.post<Store>(`${this.API_URL}/add`, store, { headers: this.getHeaders() });
  }

  updateStore(store: Store,): Observable<Store> {
    return this.http.put<Store>(`${this.API_URL}/update/${store.storeID}`, store, { headers: this.getHeaders() });
  }

  deleteStore(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/delete/${id}`, { headers: this.getHeaders() });
  }
}