import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { JsonPipe } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class StorageService {
  static readonly SECURITY_KEY = 'http://www.shimmerdentallab.com/';
  private encrypt(data) {
    return CryptoJS.AES.encrypt(data, StorageService.SECURITY_KEY).toString();
  }
  private decrypt(data) {
    return CryptoJS.AES.decrypt(data, StorageService.SECURITY_KEY).toString(
      CryptoJS.enc.Utf8
    );
  }

  constructor() {}
  setValue(key: string, value: any) {
    if (typeof value != 'string') {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, this.encrypt(value));
  }
  removeValue(key: string) {
    localStorage.removeItem(key);
  }
  getValue(key) {
    let result = localStorage.getItem(key);
    if (result) {
      result = this.decrypt(result);
      try {
        return JSON.parse(result);
      } catch (error) {
        return result;
      }
    }
  }
  clear() {
    localStorage.clear();
  }
  get token() {
    return this.getValue('token');
  }
  set token(token: string) {
    /* 假设token会在设置后55s过期*/
    this.setValue('expiredAt', String(Date.now() + 55000));
    this.setValue('token', token);
  }
  tokenValid(): boolean {
    const expiredAt = Number(this.getValue('expiredAt') || 0);
    return Date.now() < expiredAt;
  }
  clearToken() {
    localStorage.removeItem('expiredAt');
    localStorage.removeItem('token');
    localStorage.removeItem('loginUser');
  }
}
