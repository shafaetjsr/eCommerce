import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { CartService } from '../../core/service/cart.service';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { UserEntity } from '../../core/classes/user';
import { FormControl,FormsModule ,ReactiveFormsModule} from '@angular/forms';





@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ProductListComponent,RouterLink,CommonModule,MatMenuModule,MatButtonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  cartItemCount: number = 0;
  isLoggedIn: boolean = false;
  username: string = '';
  userObj: UserEntity = new UserEntity();

  productControl = new FormControl();
  products: string[] = ['Laptop', 'Phone', 'Tablet', 'Monitor', 'Keyboard', 'shuvo','one ', 'three', 'two', 'hasan', 'rubel', 'Mouse'];
  filteredProducts: string[] = [];
  showDropdown = false;

  constructor(private cartSrv: CartService, private router: Router) {}

  ngOnInit():void {
    this.filteredProducts = [];
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

  onInput(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    if (input) {
      this.filteredProducts = this.products.filter(product =>
        product.toLowerCase().includes(input)
      );
      this.showDropdown = this.filteredProducts.length > 0;
    } else {
      this.filteredProducts = [];
      this.showDropdown = false;
    }
  }

  selectProduct(product: string) {
    this.productControl.setValue(product);
    this.filteredProducts = [];
    this.showDropdown = false;
    
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
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.username = '';
    this.userObj = new UserEntity();
    this.router.navigateByUrl('/login');
  }
}