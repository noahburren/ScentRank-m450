import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <nav style="padding:8px; border-bottom:1px solid #ddd;">
      <a routerLink="/perfumes"><b>ScentRank</b></a> |
    </nav>
    <main style="padding:16px;">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {}
