import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfumeService, Perfume } from './perfume.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-perfume-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>ScentRank Mini</h1>
    <div *ngFor="let p of perfumes$ | async" class="card">
      <b>{{ p.name }}</b>
      <div>Ø {{ p.avgRating }} ({{ p.ratingsCount }})</div>
      <button *ngFor="let s of [1,2,3,4,5]" (click)="rate(p.id, s)">{{ s }}★</button>
    </div>
  `
})
export class PerfumeListComponent implements OnInit {
  perfumes$!: Observable<Perfume[]>;

  constructor(private service: PerfumeService) {}

  ngOnInit(): void {
    this.perfumes$ = this.service.list();
  }

  rate(id: number, s: number) {
    this.service.rate(id, s).subscribe(() => {
      this.perfumes$ = this.service.list();
    });
  }
}
