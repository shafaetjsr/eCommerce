import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../core/service/product.service';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '../../core/classes/api-response.model';
import { Product } from '../../core/classes/product';
import { CartService } from '../../core/service/cart.service';
import { RouterLink } from '@angular/router';
import { SliderComponent } from '../slider/slider.component';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HeaderComponent,SliderComponent,RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(private toastr: ToastrService,private productSrv:ProductService,private cartSrv:CartService){}
  ngOnInit(): void {
    this. getProducts();
  }

  getProducts(){
    this.productSrv.getProducts().subscribe((res:ApiResponseModel)=>{
      if(res.vCode=="1")
      {
        this.products = res.data;
      }else{
        this.toastr.error(res.vMsg,'Error Message')
      }
    },error=>{
      this.toastr.error(error,'Error Message')
    })
  }

  addToCart(product: any) {
    this.cartSrv.addToCart(product);
    this.toastr.success('Product Cart to successful', 'Success')
  }

}
