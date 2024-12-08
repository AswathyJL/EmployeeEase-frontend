import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    // http://localhost:4200
    {
        path:"",component:HomeComponent, title:"Home"
    }
];
