import { CanActivateFn, CanDeactivateFn } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  return true;
};

export const nonLoginGuard: CanActivateFn = (route, state) => {
  return true;
}

// export const deActivateGuard: CanDeactivateFn<unknown> = (route, state) => {
//   return true;
// };