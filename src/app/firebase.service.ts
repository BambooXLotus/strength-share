import { Profile } from './profile/profile.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {}

  public getProfile(userName: string): Observable<Profile> {
    return this.db.doc<Profile>('profiles/' + userName).valueChanges();
  }

  //   public getTraining()
}
