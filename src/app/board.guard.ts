import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AppService } from './app.service';

export const boardGuard: CanActivateFn = (route, state) => {

  const appService = inject(AppService);

  const router = inject(Router);

  if (appService.selectedProjectBoard()) {
    return true
  } else {
    router.navigateByUrl('/')
    return false
  }

};
