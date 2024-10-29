import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

type alertType = 'success' | 'warning' | 'error' | 'info' | 'question';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  public toastify(msg:string, type:alertType, timer?:number) {
    const toast = Swal.mixin({
      toast: true,
      title: msg,
      icon: type,
      position: 'top-end',
      showConfirmButton: false,
      showCloseButton: true,
      timer: timer ? timer : 3000,
      timerProgressBar: true,
      didOpen: (toast:any) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    })

    toast.fire();
  }
}
