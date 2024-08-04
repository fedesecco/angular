import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { getBrowserLang, provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './transloco/transloco.loader';
import { provideHttpClient } from '@angular/common/http';

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
    ],
};
