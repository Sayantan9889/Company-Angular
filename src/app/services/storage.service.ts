import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private cookie = inject(CookieService);
  private platformId = inject(PLATFORM_ID)

  private readonly mabboxAccessToken:string = 'pk.eyJ1Ijoic3ViaGFtMjM5NSIsImEiOiJjbDhkNnA1eXAwc3o5M29tcmd2YjZ3dmQ2In0.x3UvASry5geXaY_WTakVew';

  constructor() { }

  public setData(data: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('name', data['name']);
      localStorage.setItem('email', data['email']);
      localStorage.setItem('role', data['role']);
      localStorage.setItem('image', data['image']);
      // sessionStorage.setItem('token', data['auth-token']);
      this.cookie.set('token', data['token']);
    }
  }

  public getData() {
    if (isPlatformBrowser(this.platformId)) {
      return {
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        image: localStorage.getItem('image'),
        role: localStorage.getItem('role'),
      };
    } else return
  }

  public getToken() {
    // return sessionStorage.getItem('token');
    return this.cookie.get('token');
  }

  public removeData() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
    // sessionStorage.removeItem('token');
    this.cookie.delete('token');
  }

  getMapKey():string {
    return this.mabboxAccessToken;
  }
}
