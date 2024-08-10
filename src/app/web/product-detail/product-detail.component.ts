import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../core/classes/product';
import { ProductService } from '../../core/service/product.service';
import { ApiResponseModel } from '../../core/classes/api-response.model';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/service/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  productId: any;
  productobj:Product = new Product();
 
  constructor(private toastr: ToastrService,private route: ActivatedRoute,private productSrv:ProductService,private cartSrv:CartService) { }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.productId = params['id'];
      
      this.productSrv.getProductById(this.productId).subscribe((res:ApiResponseModel)=>{
        if(res.vCode=="1")
        {
          this.productobj = res.data;
        }else{
          this.toastr.error(res.vMsg,'Error Message')
        }
      },error=>{
        this.toastr.error(error,'Error Message')
      })
    });
  }

  addToCart(product: any) {
    this.cartSrv.addToCart(product);
    //this.toastr.success('Product Cart to successful', 'Success')
  }

}
