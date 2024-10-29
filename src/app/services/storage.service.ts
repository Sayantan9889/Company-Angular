import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public setData(data: any) {
    localStorage.setItem('name', data['name']);
    localStorage.setItem('email', data['email']);
    localStorage.setItem('image', data['image']);
    sessionStorage.setItem('token', data['x-access-token']);
  }

  public getData() {
    return {
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      image: localStorage.getItem('image')
    };
  }

  public getToken() {
    return sessionStorage.getItem('token');
  }

  public removeData() {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    sessionStorage.removeItem('token');
  }
}
