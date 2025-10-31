// src/app/perfume.service.ts
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

  private readonly base = `${globalThis.location.origin}/api`;

  constructor(private readonly http: HttpClient) {}

  list(): Observable<Perfume[]> {
    return this.http.get<Perfume[]>(`${this.base}/perfumes`);
  }

  rate(id: number, stars: number): Observable<Perfume> {
    return this.http.post<Perfume>(`${this.base}/perfumes/${id}/rate?stars=${stars}`, {});
  }
}
