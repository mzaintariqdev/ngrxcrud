import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { itemReducer } from './store/item/reducers/item.reducer';
import { ItemEffects } from './store/item/effects/item.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({
      items: itemReducer,
    }),
    provideEffects([ItemEffects]),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
  ],
};
