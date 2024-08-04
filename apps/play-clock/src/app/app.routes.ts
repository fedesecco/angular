import { Route } from '@angular/router';
import { SettingsComponent } from './pages/settings/settings.component';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'settings',
        pathMatch: 'full',
    },
    {
        path: 'settings',
        component: SettingsComponent,
    },
    {
        path: 'play',
        loadComponent: () => import('./pages/play/play.component').then((m) => m.PlayComponent),
    },
    {
        path: '**',
        redirectTo: 'settings',
        pathMatch: 'full',
    },
];
