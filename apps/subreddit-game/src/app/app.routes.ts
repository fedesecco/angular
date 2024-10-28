import { Route } from '@angular/router';
import { IntroComponent } from './pages/intro/intro.component';

export const appRoutes: Route[] = [
    {
        path: '',
        component: IntroComponent,
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: '',
    },
];
