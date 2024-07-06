import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  center: google.maps.LatLngLiteral;
  zoom: number = 15;
  apiLoaded: Promise<boolean>;

  constructor() {}

  ngOnInit() {
    this.apiLoaded = this.loadGoogleMapsApi();
    this.getCurrentLocation();
  }

  async getCurrentLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.center = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude,
    };
  }

  loadGoogleMapsApi(): Promise<boolean> {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;
      script.onload = () => resolve(true);
      document.head.appendChild(script);
    });
  }
}
