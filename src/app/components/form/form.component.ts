import { Role } from './../../models/role';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

type FormType = 'admin' | 'client' | 'user';
class Client {
  uid: number;
  sapid: number;
  sName: string;
  name: string;
  email?: string;
  address?: string;
  enabled: boolean = true;
  constructor(init: Partial<Client>) {
    Object.assign(this, init);
  }
}
class User {
  uid: number;
  sapid: number;
  name: string;
  email?: string;
  address?: string;
  roles?: Role[];
  enabled?: boolean = true;
  constructor(init: Partial<User>) {
    Object.assign(this, init);
  }
}
class Admin {
  uid: number;
  sapid: number;
  name: string;
  enabled?: boolean = true;
  constructor(init: Partial<Admin>) {
    Object.assign(this, init);
  }
}

type ValueType = Admin | User | Client;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    uid: ['', [Validators.required]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    sapId: ['', [Validators.required]],
    enabled: [true],
  });
  isAdmin: boolean = true;
  isClient: boolean = false;
  isUser: boolean = false;
  isEdit: boolean = false;
  loading: boolean = false;

  @Input() userRoles: Role[];
  @Input() allRoles: Role[];

  @Input() set data(value: ValueType) {
    this.isEdit = !!value;
    console.log(value);
    if (value) {
      this.form.patchValue(value);
      this.form.updateValueAndValidity();

      // if (value.roles) {
      //   this.userRoles = value.roles;
      // }
    }
  }

  @Input() userRolesa;

  @Input()
  set formType(type: FormType) {
    console.log(type);
    this.isAdmin = type == 'admin';
    this.isClient = type == 'client';
    this.isUser = type == 'user';
    switch (type) {
      case 'client':
        this.form = this.formBuilder.group({
          uid: ['', [Validators.required]],
          shortName: ['', [Validators.required]],
          fullName: ['', [Validators.required]],
          sapId: ['', [Validators.required]],
          email: ['', [Validators.email]],
          address: [''],
          enabled: [true],
        });
        break;
      case 'user':
        this.form = this.formBuilder.group({
          uid: ['', [Validators.required]],
          username: ['', [Validators.required]],
          password: ['', [Validators.required]],
          sapId: ['', [Validators.required]],
          email: ['', [Validators.email]],
          address: [''],
          enabled: [true],
        });
        break;
      default:
        this.form = this.formBuilder.group({
          uid: ['', [Validators.required]],
          username: ['', [Validators.required]],
          password: ['', [Validators.required]],
          sapId: ['', [Validators.required]],
          enabled: [true],
        });
        break;
    }
  }
  constructor(private formBuilder: FormBuilder) {
    setTimeout(() => {
      console.log(this.form.value);
    });
  }

  //TODO error message
  getErrorUsername() {}
  getErrorPassword() {}
  getErrorSapId() {}
  getErrorFullName() {}
  getErrorShortName() {}
  getErrorEmail() {}
  getErrorAddress() {}

  ngOnInit() {}
  onSubmit() {}
}
