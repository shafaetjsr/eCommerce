import { Routes } from '@angular/router';
import { LayoutComponent } from './web/layout/layout.component';
import { ProductListComponent } from './web/product-list/product-list.component';
import { CartComponent } from './web/cart/cart.component';
import { ProductDetailComponent } from './web/product-detail/product-detail.component';
import { LoginComponent } from './web/login/login.component';
import { CheckoutComponent } from './web/checkout/checkout.component';

export const routes: Routes = [
    {
       path:'',
       component:LayoutComponent,
       children:[
        { path:'',component:ProductListComponent},
        {path:'cart',component:CartComponent},
        {path:'product-detail',component:ProductDetailComponent},
        {path:'login',component:LoginComponent},
        {path:'checkout',component:CheckoutComponent}
       ]        
    },
    { path: '**', redirectTo: '' }
];
