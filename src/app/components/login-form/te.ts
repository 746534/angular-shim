import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent, LoginInfo } from './login-form.component';
import { MaterialModule } from '../../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  let loginInfo: LoginInfo;

  beforeEach(async(() => {
    /* 准备测试对象 */
    loginInfo = {
      username: 'validUsername',
      password: 'validPassword',
      error: null,
    };
    /* 准备测试环境 */
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MaterialModule, ReactiveFormsModule],
      declarations: [LoginFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    /* 初始化测试组件 */
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    /* 检测初始化后状态 此处等同于调用 component.ngOnInit()*/
    fixture.detectChanges();
  });

  /* 测试1: 组件初始化状态*/
  it('should create login form component', () => {
    /* 组件存在*/
    expect(component).toBeTruthy();
    /* 组件rememberMe = false*/
    expect(component.rememberMe).toBeFalse();
    /* 组件username表单无效*/
    expect(component.username.valid).toBeFalse();
    /* 组件password表单无效*/
    expect(component.password.valid).toBeFalse();
    /* 组件login按钮不可用*/
    expect(
      fixture.nativeElement.querySelector('button[disabled]')
    ).toBeTruthy();
    /* 组件错误信息元素不可用*/
    expect(fixture.nativeElement.querySelector('mat-error')).toBeFalsy();
  });
  /* 测试2: 组件赋有效值后状态*/
  it('should valid and ready to login', () => {
    component.loginInfo = loginInfo;
    /*赋值后要等待一个tick 刷新界面*/
    fixture.detectChanges();
    /* 组件login按钮可用*/
    expect(fixture.nativeElement.querySelector('button[disabled]')).toBeFalsy();
    /* 组件错误信息元素不可用*/
    expect(fixture.nativeElement.querySelector('mat-error')).toBeFalsy();
  });
  /* 测试3: 组件点击登录后,接受到登录信息*/
  it('should receive login event', () => {
    component.loginInfo = loginInfo;
    fixture.detectChanges();
    /*订阅登录事件并准备接受登录信息*/
    let _loginInfo: LoginInfo;
    component.login.subscribe((__loginInfo: LoginInfo) => {
      _loginInfo = __loginInfo;
    });
    /*模拟登录 */
    fixture.nativeElement.querySelector('button.mat-raised-button').click();
    /*接受到登录信息为赋值登录信息的小写形式 */
    expect(_loginInfo.username).toBe(loginInfo.username.toLowerCase());
    expect(_loginInfo.password).toBe(loginInfo.password.toLowerCase());
    /*点击登录按钮时改变组件 loading状态,需要等待一个tick */
    fixture.detectChanges();
    /*loading状态,登录按钮不可用 */
    expect(
      fixture.nativeElement.querySelector('button[disabled]')
    ).toBeTruthy();
  });
  it('should remember loginInfo', () => {
    component.loginInfo = loginInfo;
    component.rememberMe = true;
    fixture.detectChanges();
    component.login.subscribe(() => { });
    fixture.nativeElement.querySelector('button.mat-raised-button').click();
    /*rememberMe启用,验证localStorage中的值 */
    expect(localStorage.getItem('rememberMe')).toBe('true');
    expect(localStorage.getItem('username')).toBe(loginInfo.username);
    expect(localStorage.getItem('password')).toBe(loginInfo.password);
  });
  afterEach(() => {
    /*每一项测试完成后,清空localStorage中的值 */
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  });
});
