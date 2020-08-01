import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

export interface LoginInfo {
  username?: string;
  password?: string;
  rememberMe?: boolean;
  error?: string;
}
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  private usernameCompose = [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(32),
    Validators.pattern('^[A-Za-z][A-Za-z0-9]{5,32}'),
  ];
  private passwordCompose = [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(32),
    Validators.pattern('[A-Za-z0-9]*'),
  ];
  form: FormGroup = this.formBuilder.group({
    username: ['', this.usernameCompose],
    password: ['', this.passwordCompose],
    rememberMe: [false],
  });
  loading: boolean = false;
  error: string = null;
  loginTimer: any;

  @Input()
  set loginInfo(info: LoginInfo) {
    if (info) {
      this.error = info.error || this.error;
      this.form.patchValue(info);
      this.form.updateValueAndValidity();
    }
  }
  @Output() login = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}

  getErrorUsername() {
    return this.form.get('username').hasError('required')
      ? '用户名不能为空'
      : this.form.get('username').hasError('pattern')
      ? '*用户名格式输入错误*'
      : '';
  }
  getErrorPassword() {
    return this.form.get('password').hasError('required') ? '请输入密码' : '';
  }
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    let passwordLower = this.form.value.password
    // if(this.form.value.password.toLowerCase()){
    //   passwordLower = this.form.value.password.toLowerCase()
    // }
    this.login.emit({
      username: this.form.value.username.toLowerCase(),
      password: passwordLower,
      rememberMe: this.form.value.rememberMe,
    });
    this.loginTimer = setTimeout(() => {
      this.loading = false;
      this.error = 'Login Timeout';
    }, 10000);
  }
  ngOnDestroy() {
    clearTimeout(this.loginTimer);
  }
}
