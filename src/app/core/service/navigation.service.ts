import { Injectable } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private previousUrl = "";
  private currentUrl = "";

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.previousUrl = this.currentUrl;
      this.currentUrl = event.urlAfterRedirects;
    });
  }

  public getPreviousUrl(): string  {
    return this.previousUrl;
  }
}
