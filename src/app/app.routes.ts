import { Routes } from '@angular/router';
import { LayoutComponent } from './web/layout/layout.component';
import { ProductListComponent } from './web/product-list/product-list.component';
import { CartComponent } from './web/cart/cart.component';

export const routes: Routes = [
    {
       path:'',
       component:LayoutComponent,
       children:[
        { path:'',component:ProductListComponent},
        {path:'cart',component:CartComponent}
       ]        
    },
    { path: '**', redirectTo: '' }
];
