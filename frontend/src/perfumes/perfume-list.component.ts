import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfumeService, Perfume } from './perfume.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-perfume-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="header">
      <h1 class="title">Entdecke & Bewerte Düfte</h1>
      <p class="subtitle">Teile deine Meinung über die besten Parfums</p>
    </div>

    <div class="perfume-grid">
      <div *ngFor="let p of perfumes$ | async" class="perfume-card">
        <div class="card-header">
          <h3 class="perfume-name">{{ p.name }}</h3>
          <div class="rating-badge">
            <span class="star-icon">⭐</span>
            <span class="rating-value">{{ p.avgRating > 0 ? p.avgRating.toFixed(1) : '—' }}</span>
          </div>
        </div>

        <div class="rating-info">
          <span class="rating-count">{{ p.ratingsCount }} Bewertung{{ p.ratingsCount !== 1 ? 'en' : '' }}</span>
        </div>

        <div class="rating-buttons">
          <p class="rating-label">Deine Bewertung:</p>
          <div class="stars">
            <button
              type="button"
              *ngFor="let s of [1,2,3,4,5]"
              (click)="rate(p.id, s)"
              class="star-button"
              [attr.aria-label]="s + ' Sterne'"
            >
              {{ s }}★
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .title {
      font-size: 2.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: #64748b;
      font-size: 1.1rem;
    }

    .perfume-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .perfume-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      transition: all 0.3s ease;
      border: 1px solid #e2e8f0;
    }

    .perfume-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(102, 126, 234, 0.15);
      border-color: #667eea;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 0.75rem;
      gap: 1rem;
    }

    .perfume-name {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
      flex: 1;
    }

    .rating-badge {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      flex-shrink: 0;
    }

    .star-icon {
      font-size: 1rem;
    }

    .rating-value {
      font-weight: 700;
      color: #92400e;
      font-size: 1rem;
    }

    .rating-info {
      margin-bottom: 1.25rem;
      color: #64748b;
      font-size: 0.9rem;
    }

    .rating-count {
      display: inline-block;
    }

    .rating-buttons {
      border-top: 1px solid #e2e8f0;
      padding-top: 1rem;
    }

    .rating-label {
      font-size: 0.9rem;
      color: #64748b;
      margin: 0 0 0.75rem 0;
      font-weight: 500;
    }

    .stars {
      display: flex;
      gap: 0.5rem;
    }

    .star-button {
      flex: 1;
      background: white;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      padding: 0.6rem;
      font-size: 1.1rem;
      cursor: pointer;
      transition: all 0.2s ease;
      color: #64748b;
      font-weight: 600;
    }

    .star-button:hover {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-color: #667eea;
      color: white;
      transform: scale(1.05);
    }

    .star-button:active {
      transform: scale(0.95);
    }

    @media (max-width: 768px) {
      .title {
        font-size: 2rem;
      }

      .perfume-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PerfumeListComponent implements OnInit {
  perfumes$!: Observable<Perfume[]>;

  constructor(private readonly service: PerfumeService) {}

  ngOnInit(): void {
    this.perfumes$   = this.service.list();
  }

  rate(id: number, s: number) {
    this.service.rate(id, s).subscribe(() => {
      this.perfumes$ = this.service.list();
    });
  }
}
