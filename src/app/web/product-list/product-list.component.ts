import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../core/service/product.service';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '../../core/classes/api-response.model';
import { Product } from '../../core/classes/product';
import { CartService } from '../../core/service/cart.service';
import { RouterLink } from '@angular/router';
import { SliderComponent } from '../slider/slider.component';
import { SpinnerComponent } from "../../common/spinner/spinner.component";
import { ProductSelectionServiceService } from '../../core/service/product-selection-service.service';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SliderComponent, RouterLink, SpinnerComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
 
  products: Product[] = [];
  isLoading: boolean = true;

  constructor(private toastr: ToastrService,private productSrv:ProductService,private cartSrv:CartService,
    private productSelectionService: ProductSelectionServiceService
  ){}
  ngOnInit(): void {
    this. getProducts();
    this.productSelectionService.selectedProduct$.subscribe(productName => {
      if (productName) {
        this.getProducts(productName);
      }
    });

  }

 getProducts(productName?: string) {
    if (productName) {
      this.productSrv.searchFilter(productName).subscribe((res: ApiResponseModel) => {
        if (res.vCode === "1") {
          this.products = res.data;
          this.isLoading = false;
        } else {
          this.toastr.error(res.vMsg, 'Error Message');
          this.isLoading = false;
        }
      }, error => {
        this.toastr.error(error, 'Error Message');
        this.isLoading = false;
      });
    } else {
      // Handle case when no product name is provided, or load all products
      this.productSrv.getProducts().subscribe((res: ApiResponseModel) => {
        if (res.vCode === "1") {
          this.products = res.data;
          this.isLoading = false;
        } else {
          this.toastr.error(res.vMsg, 'Error Message');
          this.isLoading = false;
        }
      }, error => {
        this.toastr.error(error, 'Error Message');
        this.isLoading = false;
      });
    }
  }

  addToCart(product: any) {
    this.cartSrv.addToCart(product);
    //this.toastr.success('Product Cart to successful', 'Success')
    this.toastr.success('Product added to cart successfully', 'Success', {
      positionClass: 'toast-bottom-right'
    });
  }

}
