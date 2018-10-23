import { Injectable } from '@angular/core';
import { Profile } from './profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private userProfile: Profile;

  constructor() {}

  public setUserProfile(profile: Profile) {
    this.userProfile = profile;
  }

  public currentUserProfile() {
    return this.userProfile;
  }
}
