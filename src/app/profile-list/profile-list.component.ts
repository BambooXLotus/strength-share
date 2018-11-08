import { Profile } from './../profile/profile.model';
import { Observable } from 'rxjs';
import { FirebaseService } from './../firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {
  profiles$: Observable<Profile[]> | null = null;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.profiles$ = this.firebaseService.getProfiles();
  }
}
