import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { CartService } from '../../core/service/cart.service';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { UserEntity } from '../../core/classes/user';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ProductListComponent,RouterLink,CommonModule,MatMenuModule,MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  cartItemCount: number = 0;
  isLoggedIn: boolean = false;
  username: string = '';
  userObj: UserEntity = new UserEntity();

  constructor(private cartSrv: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartSrv.getCartItems().subscribe(items => {
      this.cartItemCount = items.reduce((total, item) => total + item.stock_quantity, 0);
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadUserData();
      }
    });

    this.loadUserData(); // Initial load
  }

  loadUserData(): void {
    const status = localStorage.getItem('isLoggedIn');
    if (status === 'true') {
      this.isLoggedIn = true;
      const user = localStorage.getItem('userinfo');
      if (user) {
        this.userObj = JSON.parse(user);
        this.username = this.userObj.userName;
      } else {
        this.userObj = new UserEntity();
      }
    } else {
      this.isLoggedIn = false;
      this.username = '';
      this.userObj = new UserEntity();
    }
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userinfo');
    this.isLoggedIn = false;
    this.username = '';
    this.userObj = new UserEntity();
    this.router.navigateByUrl('/login');
  }
}