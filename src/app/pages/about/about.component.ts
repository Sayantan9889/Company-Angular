import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertService, ApiService } from '@services';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  private readonly api = inject(ApiService);
  private readonly alert = inject(AlertService);

  protected aboutUs: any = {};
  protected ourTeam: any = {};

  constructor() {
    this.getAboutUs();
    this.getOurTeam();
  }

  private getAboutUs() {
    this.api.get('about-us/about/fetch').subscribe({
      next: (res: any) => {
        if (res.status == 200) {
          this.aboutUs = res.data;
          // console.log("this.aboutUs: ", this.aboutUs);
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
  private getOurTeam() {
    this.api.get('about-us/our-team').subscribe({
      next: (res: any) => {
        if (res.status == 200) {
          this.ourTeam = res.data;
          // console.log("this.ourTeam: ", this.ourTeam);
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
