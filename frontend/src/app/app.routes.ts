import { Routes } from '@angular/router';
import { PerfumeListComponent } from '../perfumes/perfume-list.component';
import {AppComponent} from './app.component';

export const routes: Routes = [
    { path: 'perfumes', component: PerfumeListComponent },
    { path: '', component: PerfumeListComponent },

];

