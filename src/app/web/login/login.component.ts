import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../core/service/navigation.service';
import { UserService } from '../../core/service/user.service';
import { LoginDto } from '../../core/classes/LoginDto';
import { CommonModule } from '@angular/common';
import { FormsModule,FormBuilder,Validators,FormGroup ,ReactiveFormsModule} from '@angular/forms';
import { UserEntity } from '../../core/classes/user';
import { ApiResponseModel } from '../../core/classes/api-response.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  previousUrl = "";
  loginDto:LoginDto = new LoginDto();
  userObj:UserEntity = new UserEntity();
  respon:any;

  RegisterForm: any;

  constructor(private navigationService: NavigationService,private userSrv:UserService,private toastr: ToastrService,private route:Router,private fb: FormBuilder) {}

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
    this.RegisterForm = this.fb.group(
      {
              username: ['', [Validators.required, Validators.minLength(5)]],
              phoneNumber: ['', [Validators.required, Validators.minLength(11)]],
              address: ['', [Validators.required]],
              password: ['', [Validators.required, Validators.minLength(6)]],
              confirmPassword: ['', Validators.required],
              terms: [false, Validators.requiredTrue]
            },
      { validator: this.checkPasswords }
    );

  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }

  onSubmit():void {
    if (this.RegisterForm.valid) {
      this.toastr.success('Save successfully:', this.RegisterForm.value);
      // Additional code for saving the form data can go here.
    } else {
      this.toastr.success('Form is not valid!');
    }


}


  doLogin() {
    this.userSrv.login(this.loginDto).subscribe((res: ApiResponseModel) => {
      if (res.vCode === "1") {
        this.respon = res.data;
        this.userObj = this.respon.user;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userinfo', JSON.stringify(this.userObj));
        localStorage.setItem('token', JSON.stringify(this.respon.token));
        this.route.navigateByUrl(this.previousUrl, { skipLocationChange: true }).then(() => {
          this.route.navigate([this.previousUrl]);
        });
      } else {
        this.toastr.error(res.vMsg, 'Error Message');
      }
    }, error => {
      this.toastr.error(error, 'Error Message');
    });
  }


}
