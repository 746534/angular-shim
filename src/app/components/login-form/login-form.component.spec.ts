import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { logging } from 'protractor';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent, LoginInfo } from './login-form.component';
import { NgIf } from '@angular/common';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  let lginInfo:LoginInfo
  beforeEach(async(() => {
    lginInfo = {
      username: 'a123456',
      password: 'a12345678',
      error:null,
    }
    TestBed.configureTestingModule({
      imports:[BrowserAnimationsModule,MaterialModule,ReactiveFormsModule],
      declarations: [ LoginFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create login form component', () => {
    expect(component).toBeTruthy();
    expect(component.form.value.checked).toBeFalse();
    expect(component.form.value.username.valid).toBeFalse();
    expect(component.form.value.password.valid).toBeFalse();
    
  });
});
