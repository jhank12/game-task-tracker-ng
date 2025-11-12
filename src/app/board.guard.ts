import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AppService } from './app.service';

import { map } from 'rxjs';

export const boardGuard: CanActivateFn = (route, state) => {

  const appService = inject(AppService);

  const router = inject(Router);

  return appService.checkDataLoaded().pipe(
    map(isLoaded => {
      if (isLoaded) {
        // if (appService.selectedProjectBoard()) {
        return true

        // } else {
        //   router.navigateByUrl('/');
        //   return false
        // }
      } else {
        return false
      }
    })
  )

  // if (appService.selectedProjectBoard()) {
  //   return true
  // } else {
  //   router.navigateByUrl('/')
  //   console.log("asdfasdfasdfasdf")
  //   return false
  // }

};
