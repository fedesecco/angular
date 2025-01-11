import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { getBrowserLang, provideTransloco } from '@jsverse/transloco';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { TranslocoHttpLoader } from './transloco/transloco.loader';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes),
        provideHttpClient(),
        provideTransloco({
            config: {
                availableLangs: ['en', 'it'],
                defaultLang: getBrowserLang() === 'it' ? 'it' : 'en',
                reRenderOnLangChange: true,
                prodMode: !isDevMode(),
            },
            loader: TranslocoHttpLoader,
        }),
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura,
            },
        }),
    ],
};
