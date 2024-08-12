import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../core/service/navigation.service';
import { UserService } from '../../core/service/user.service';
import { LoginDto } from '../../core/classes/LoginDto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserEntity } from '../../core/classes/user';
import { ApiResponseModel } from '../../core/classes/api-response.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  previousUrl = "";
  loginDto:LoginDto = new LoginDto();
  userObj:UserEntity = new UserEntity();
  respon:any;

  constructor(private navigationService: NavigationService,private userSrv:UserService,private toastr: ToastrService,private route:Router) {}

  ngOnInit(): void {
    this.previousUrl = this.navigationService.getPreviousUrl();
    // console.log('Previous URL:', this.previousUrl);

    // if (this.previousUrl === undefined || this.previousUrl === '/') {
    //   console.log('User came from the root page.');
    // } else if (this.previousUrl === '/cart') {
    //   console.log('User came from the cart page.');
    // } else if (this.previousUrl === '/home') {
    //   console.log('User came from the home page.');
    // }

  }

  doLogin() {
    this.userSrv.login(this.loginDto).subscribe((res: ApiResponseModel) => {
      if (res.vCode === "1") {
        this.respon = res.data;
        this.userObj = this.respon.user;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userinfo', JSON.stringify(this.userObj));
        localStorage.setItem('token', JSON.stringify(this.respon.token));
        this.route.navigateByUrl(this.previousUrl);
      } else {
        this.toastr.error(res.vMsg, 'Error Message');
      }
    }, error => {
      this.toastr.error(error, 'Error Message');
    });
  }


}
