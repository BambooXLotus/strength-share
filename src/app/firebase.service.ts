import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Profile } from './profile/profile.model';
import { TrainingPlan } from './training-plan/training-plan.model';
import { TrainingDay } from './training-plan/training-week/training-day/training-day.model';
import { TrainingWork } from './training-plan/training-week/training-day/training-work/training-work.model';
import { TrainingWeek } from './training-plan/training-week/training-week.model';
import { ProfileService } from './profile/profile.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private profileService: ProfileService
  ) {}

  public getProfile(userName: string): Observable<Profile> {
    return this.db
      .doc<Profile>('profiles/' + userName)
      .snapshotChanges()
      .pipe(
        map((actions) => {
          const data = actions.payload.data() as Profile;
          const id = actions.payload.id;

          this.profileService.setUserProfile({ id, ...data });
          return { id, ...data };
        })
      );
  }

  public addProfile(profile: Profile) {
    return from(this.db.collection('profiles').add(profile));
  }

  public getTrainingPlan(userName: string, trainingPlanId: string): Observable<TrainingPlan> {
    return this.db.doc<TrainingPlan>(`trainingPlans/${trainingPlanId}`).valueChanges();
  }

  public getTrainingWeeks(trainingPlanName: string): Observable<TrainingWeek[]> {
    return this.db
      .collection<TrainingWeek>(`trainingPlanWeeks`, (ref) => ref.where('trainingPlanId', '==', trainingPlanName))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as TrainingWeek;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  public getTrainingWorks(trainingPlanDayId: string): Observable<TrainingWork[]> {
    return this.db
      .collection<TrainingWork>(`trainingPlanLifts`, (ref) => ref.where('trainingPlanDayId', '==', trainingPlanDayId))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            console.log(a);
            const data = a.payload.doc.data() as TrainingWork;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  public addTrainingWork(item: TrainingWork) {
    return from(this.db.collection('trainingPlanLifts').add(Object.assign({}, item)));
  }

  public getTrainingWorkLoad(trainingWorkId: string, profileId: string) {
    const workWeightPath = `trainingPlanLiftLoads/${trainingWorkId}_${profileId}`;

    return from(
      this.db
        .doc(workWeightPath)
        .snapshotChanges()
        .pipe(
          map((a) => {
            const data = a.payload.data() as Profile;
            const id = a.payload.id;
            return { id, ...data };
          })
        )
    );
  }

  public setTrainingWorkWeight(trainingWorkId: string, profileId: string, weight: number) {
    const workWeightPath = `trainingPlanLiftLoads/${trainingWorkId}_${profileId}`;

    return from(this.db.doc(workWeightPath).set({ load: weight }));
  }

  public getTrainingDays(trainingPlanWeekId: string): Observable<TrainingDay[]> {
    return this.db
      .collection<TrainingDay>(`trainingPlanDays`, (ref) =>
        ref.where('trainingPlanWeekId', '==', trainingPlanWeekId).orderBy('order')
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as TrainingDay;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  public addTrainingDay(item: TrainingDay) {
    return from(this.db.collection('trainingPlanDays').add(Object.assign({}, item)));
  }

  public getProfileDeep(userName: string): Observable<Profile> {
    return this.db
      .doc<Profile>('profiles/' + userName)
      .snapshotChanges()
      .pipe(
        map((a) => {
          const data = a.payload.data() as Profile;
          const id = a.payload.id;
          return { id, ...data };
        })
      );
  }
}
