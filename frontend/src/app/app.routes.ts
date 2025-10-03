import { Routes } from '@angular/router';
import { PerfumeListComponent } from '../perfumes/perfume-list.component';
import {AppComponent} from './app.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'perfumes', component: PerfumeListComponent },

];

