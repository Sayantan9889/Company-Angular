import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertService, ApiService, StorageService } from '@services';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private api = inject(ApiService);
  private alert = inject(AlertService);
  private storage = inject(StorageService);
  private platformId = inject(PLATFORM_ID);

  protected map:mapboxgl.Map | undefined = undefined;
  protected contactDetails: any = {};
  protected latLng: { lat: number, lng: number } = { lat: 0, lng: 0 };
  private style:string = 'mapbox://styles/mapbox/streets-v12';

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.getContactDetails();
    }
  }

  private initMap() {
    const _lat = this.latLng.lat;
    const _lng = this.latLng.lng;
    console.log();
    setTimeout(() => {
      this.map = new Map({
        accessToken: this.storage.getMapKey(),
        container: "map-container",
        style: this.style,
        center: [_lng, _lat],
        zoom: 12,
        attributionControl: false,
      });

      const marker = new Marker({
        color: 'red'
      }).setLngLat([_lng, _lat]).addTo(this.map);
    }, 100);
  }

  protected getContactDetails() {
    this.api.get('contact-info/fetch').subscribe({
      next: (res: any) => {
        if (res.status == 200) {
          this.contactDetails = res.data;
          this.latLng = { lat: this.contactDetails.lat, lng: this.contactDetails.lng };
          console.log("this.contactDetails: ", this.contactDetails);
          this.initMap();
        } else {
          console.error(res);
          this.alert.toastify(res.message, 'warning');
        }
      },
      error: (err: any) => {
        console.error('error: ', err);
        this.alert.toastify(err.message, 'error');
      }
    })
  }
}
