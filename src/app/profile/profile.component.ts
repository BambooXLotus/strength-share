import { Profile } from './profile.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  profile: Profile;

  ngOnInit() {
    this.route.snapshot.paramMap.get('id');

    this.profile = { id: 'donkey', username: 'username', photo: 'deren.jpg' };
  }
}
