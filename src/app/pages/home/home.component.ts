import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertService, ApiService } from '@services';
import { ViewModalComponent } from 'src/app/shared/view-modal/view-modal.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EditorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [
    // If you're self hosting and lazy loading TinyMCE from node_modules:
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ]
})
export class HomeComponent {
  private readonly api = inject(ApiService);
  private readonly alert = inject(AlertService);
  private readonly dialog = inject(MatDialog);

  protected banners:Array<any> = [];
  protected services:Array<any> = [];
  protected aboutUs:any = {};
  protected testimonials:any[] = [];

  constructor() {
    this.getBanner();
    this.getServices();
    this.getAboutUs();
    this.getTestimonials();
  }

  private getBanner() {
    this.api.get('home/banner/fetch-all').subscribe({
      next: (res: any) => {
        if (res.status == 200) {
          this.banners = res.data;
          // console.log("this.banners: ", this.banners);
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

  protected viewBannerDetails(banner:any) {
    const dialogRef = this.dialog.open(ViewModalComponent, {
      width: '700px',
      minHeight: '300px',
      // disableClose: true,
      // autoFocus: false,
      // panelClass: ['modal-class'],
      data: { modal: 'view-banner-details', banner: banner }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('modal closed');
    });
  }

  private getServices() {
    this.api.get('home/service/fetch-all').subscribe({
      next: (res: any) => {
        if (res.status == 200) {
          this.services = res.data;
          // console.log("this.services: ", this.services);
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

  private getTestimonials() {
    this.api.get('home/testimony/fetch-all').subscribe({
      next: (res: any) => {
        if (res.status == 200) {
          this.testimonials = res.data;
          console.log("this.testimonials: ", this.testimonials);
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
