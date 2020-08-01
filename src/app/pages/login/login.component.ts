import { LoginInfo } from './../../components/login-form/login-form.component';
import { StorageService } from './../../services/storage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './../../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginInfo: LoginInfo;
  constructor(
    private router: Router,
    private storageService: StorageService,
    private accountService: AccountService
  ) {
    if (storageService.getValue('rememberMe')) {
      this.loginInfo = {
        username: storageService.getValue('username'),
        password: storageService.getValue('password'),
        rememberMe: true,
        error: null,
      };
    }
  }
  ngOnInit() {}

  login(loginInfo: LoginInfo) {
    console.log(loginInfo);
    this.accountService.login(loginInfo.username, loginInfo.password).subscribe(
      (admin) => {
        //TODO show toast
        console.log('Login Success');
        if (loginInfo.rememberMe) {
          this.storageService.setValue('rememberMe', true);
          this.storageService.setValue('username', loginInfo.username);
          this.storageService.setValue('password', loginInfo.password);
        } else {
          this.storageService.removeValue('rememberMe');
          this.storageService.removeValue('username');
          this.storageService.removeValue('password');
        }
        this.router.navigate(['/']);
      },
      (error) => {
        //TODO show error
        console.log(error);
        this.loginInfo = {
          error: error.statusText || '用户和账号不匹配',
        };
        console.error('Login Failed');
      }
    );
  }
}
