import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient,provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'

import { routes } from './app.routes';

export function HttpLoaderFactor(http: HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(),HttpClient,
    provideAnimationsAsync(),
        providePrimeNG({ 
            theme: {
                preset: Aura
            }
    }),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader:{
          provide:TranslateLoader,
          useFactory:HttpLoaderFactor,
          deps:[HttpClient]
        }
      })
    )
  ]
};
