import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  profile: any = {
    isLoggedIn: false,
    userRole: 2,
    default: 'Hello',
  };
  private profileUpdate = new Subject<any>();
  profileUpdate$ = this.profileUpdate.asObservable();

  constructor() {}

  updateProfile(profile: any) {
    this.profile = profile;
    this.profileUpdate.next(this.profile);
  }

  getProfile() {
    return this.profile;
  }
}
