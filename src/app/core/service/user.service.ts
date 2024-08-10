import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '../classes/api-response.model';
import { environment } from '../../../environments/environment';
import { Constant } from '../constant/Constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api:ApiService) { }
  
  login(obj:any):Observable<ApiResponseModel>{
    return this.api.post(environment.api_url+Constant.API_END_POINT.GET_TOKEN,obj);
  }

}
