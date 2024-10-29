import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn } from '@angular/router';
import { AuthService } from '@services';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return true;
};

export const nonLoginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return true;
}

// export const deActivateGuard: CanDeactivateFn<unknown> = (route, state) => {
//   return true;
// };