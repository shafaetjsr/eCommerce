import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../core/classes/product';
import { CartService } from '../../core/service/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  products: Product[] = [];
  cartService = inject(CartService); 
  totalSalesPrice: number = 0;
  totalDiscount: number = 0;
  

  constructor(private toastr: ToastrService,private route:Router) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.products = items;
      this.updateTotals();
    });
  }

  removeProduct(productId: number): void {
    const confirmed = confirm("Are you sure you want to remove this product from the cart?");
    if (confirmed) {
      this.cartService.removeFromCart(productId);
      this.products = this.products.filter(product => product.product_id !== productId);
      this.updateTotals();
      this.toastr.warning('Product remove successfully', 'warning')
      // this.toastr.warning('Product remove successfully', 'warning', {
      //   positionClass: 'toast-bottom-right'
      // });
    }
  }

  onQuantityChange(event: Event, product: Product): void {
    const inputElement = event.target as HTMLInputElement;
    let selectedQuantity = +inputElement.value; 
    if (selectedQuantity < 1) {
      selectedQuantity = 1;
      inputElement.value = '1';
    }

    const index = this.products.findIndex(p => p.product_id === product.product_id);
    if (index !== -1) {
      this.products[index].stock_quantity = selectedQuantity;
      this.updateTotals();
    }
  }
  
  calculateTotalSalesPrice(): number {
    return this.products.reduce((sum, product) => sum + (product.sales_price * product.stock_quantity), 0);
  }

  calculateTotalDiscountPrice(): number {
    return this.products.reduce((sum, product) => sum + (product.discount_amount * product.stock_quantity), 0);
  }

  updateTotals(): void {
    this.totalSalesPrice = this.calculateTotalSalesPrice();
    this.totalDiscount = this.calculateTotalDiscountPrice();
  }

  doChecklogin(){
    var token = localStorage.getItem('token')
    if(token){
      this.route.navigateByUrl('checkout');
    }else
    {
      this.route.navigateByUrl('login');
    }
  }

}