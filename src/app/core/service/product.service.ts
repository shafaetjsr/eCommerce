import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '../classes/api-response.model';
import { environment } from '../../../environments/environment';
import { Constant } from '../constant/Constant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private api:ApiService) {}

  productSave(obj:any):Observable<ApiResponseModel>{
    return this.api.post(environment.api_url+Constant.API_END_POINT.PRODUCT_SAVE,obj);
  }

  getProducts():Observable<ApiResponseModel>{
    return this.api.get(environment.api_url+Constant.API_END_POINT.GET_PRODUCT)
  }
 
  getProductById(id:any):Observable<ApiResponseModel>{
    return this.api.get(environment.api_url+Constant.API_END_POINT.GET_PRODUCT_BY_ID+id);
  }

  searchProduct(searchKey:any):Observable<ApiResponseModel>{
    return this.api.get(environment.api_url+Constant.API_END_POINT.GET_PRODUCT_SEARCH+searchKey)
  }
}
