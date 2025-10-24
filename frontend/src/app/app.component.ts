import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <nav class="navbar">
      <div class="nav-content">
        <a routerLink="/perfumes" class="logo">
          <span class="logo-icon">🌸</span>
          <span class="logo-text">ScentRank</span>
        </a>
      </div>
    </nav>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .navbar {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 1rem 0;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .nav-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .logo {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-size: 1.5rem;
      font-weight: 700;
      transition: transform 0.2s;
    }

    .logo:hover {
      transform: translateY(-2px);
    }

    .logo-icon {
      font-size: 1.8rem;
    }

    .logo-text {
      letter-spacing: 0.5px;
    }

    .main-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
    }
  `]
})
export class AppComponent {}
