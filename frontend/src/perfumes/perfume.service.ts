import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Perfume {
  id: number;
  name: string;
  avgRating: number;
  ratingsCount: number;
}

@Injectable({ providedIn: 'root' })
export class PerfumeService {
  constructor(private http: HttpClient) {}

  list(): Observable<Perfume[]> {
    return this.http.get<Perfume[]>('/api/perfumes');
  }

  rate(id: number, stars: number): Observable<Perfume> {
    return this.http.post<Perfume>(`/api/perfumes/${id}/rate?stars=${stars}`, {});
  }
}
