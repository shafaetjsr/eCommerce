import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../core/service/navigation.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  previousUrl: string | undefined;

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.previousUrl = this.navigationService.getPreviousUrl();
    console.log('Previous URL:', this.previousUrl);

    if (this.previousUrl === undefined || this.previousUrl === '/') {
      console.log('User came from the root page.');
    } else if (this.previousUrl === '/cart') {
      console.log('User came from the cart page.');
    } else if (this.previousUrl === '/home') {
      console.log('User came from the home page.');
    }
  }
}
