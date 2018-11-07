import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Profile } from './profile/profile.model';
import { ProfileService } from './profile/profile.service';
import { TrainingPlan } from './training-plan/training-plan.model';
import { TrainingDay } from './training-plan/training-week/training-day/training-day.model';
import { TrainingWorkLoad } from './training-plan/training-week/training-day/training-work/training-work-load/training-work-load.model';
import { TrainingWork } from './training-plan/training-week/training-day/training-work/training-work.model';
import { TrainingWeek } from './training-plan/training-week/training-week.model';

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

  public getProfileDeep(userName: string): Observable<Profile> {
    return this.db
      .doc<Profile>('profiles/' + userName)
      .snapshotChanges()
      .pipe(
        map((a) => {
          const data = a.payload.data() as Profile;

          data.id = a.payload.id;
          this.profileService.setUserProfile(data);
          data.currentTrainingPlan = this.getTrainingPlanDeep(data.currentTrainingPlanId);
          return data;
        })
      );
  }

  public addProfile(profile: Profile) {
    return from(this.db.collection('profiles').add(profile));
  }

  public getTrainingPlan(trainingPlanId: string): Observable<TrainingPlan> {
    return this.db.doc<TrainingPlan>(`trainingPlans/${trainingPlanId}`).valueChanges();
  }

  private getTrainingPlanDeep(trainingPlanId: string): Observable<TrainingPlan> {
    return this.db
      .doc<TrainingPlan>(`trainingPlans/${trainingPlanId}`)
      .snapshotChanges()
      .pipe(
        map((a) => {
          const data = a.payload.data() as TrainingPlan;
          data.id = a.payload.id;
          data.weeks = this.getTrainingWeeksDeep(data.id);

          return data;
        })
      );
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

  private getTrainingWeeksDeep(trainingPlanId: string): Observable<TrainingWeek[]> {
    return this.db
      .collection<TrainingWeek>(`trainingPlanWeeks`, (ref) => ref.where('trainingPlanId', '==', trainingPlanId))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            console.log(a);
            const data = a.payload.doc.data() as TrainingWeek;
            data.id = a.payload.doc.id;
            data.days = this.getTrainingDaysDeep(data.id);

            return data;
          })
        )
      );
  }

  public getTrainingWorks(trainingPlanDayId: string): Observable<TrainingWork[]> {
    return this.db
      .collection<TrainingWork>(`trainingPlanLifts`, (ref) =>
        ref.where('trainingPlanDayId', '==', trainingPlanDayId).orderBy('order')
      )
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

  private getTrainingWorksDeep(trainingPlanDayId: string): Observable<TrainingWork[]> {
    return this.db
      .collection<TrainingWork>(`trainingPlanLifts`, (ref) =>
        ref.where('trainingPlanDayId', '==', trainingPlanDayId).orderBy('order')
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            console.log('Works');
            console.log(a);
            const data = a.payload.doc.data() as TrainingWork;
            data.id = a.payload.doc.id;
            console.log(data);
            data.load = this.getTrainingWorkLoad(data.id);

            return data;
          })
        )
      );
  }

  public getTrainingWorkLoad(trainingWorkId: string) {
    const profileId = this.profileService.currentUserProfile().id;
    const workWeightPath = `trainingPlanLiftLoads/${trainingWorkId}_${profileId}`;

    return this.db
      .doc(workWeightPath)
      .snapshotChanges()
      .pipe(
        map((a) => {
          const data = a.payload.data() as TrainingWorkLoad;

          const id = a.payload.id;
          return { id, ...data };
        })
      );
  }

  public setTrainingWorkWeight(trainingWorkId: string, trainingLoad: TrainingWorkLoad) {
    const profileId = this.profileService.currentUserProfile().id;
    const workWeightPath = `trainingPlanLiftLoads/${trainingWorkId}_${profileId}`;

    return from(this.db.doc(workWeightPath).set({ load: trainingLoad.load, loadDisplay: trainingLoad.loadDisplay }));
  }

  public setTrainingWorkResult(trainingWorkId: string, trainingLoad: TrainingWorkLoad) {
    const profileId = this.profileService.currentUserProfile().id;
    const workWeightPath = `trainingPlanLiftResults/${trainingWorkId}_${profileId}`;

    return from(this.db.doc(workWeightPath).set({ load: trainingLoad.load, loadDisplay: trainingLoad.loadDisplay }));
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

  private getTrainingDaysDeep(trainingPlanWeekId: string): Observable<TrainingDay[]> {
    return this.db
      .collection<TrainingDay>(`trainingPlanDays`, (ref) =>
        ref.where('trainingPlanWeekId', '==', trainingPlanWeekId).orderBy('order')
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as TrainingDay;
            data.id = a.payload.doc.id;
            data.works = this.getTrainingWorksDeep(data.id);

            return data;
          })
        )
      );
  }

  public getTrainingDayDeep(trainingPlanId: string, weekOrder: number, dayOrder: number) {
    this.db
      .collection<TrainingWeek>('trainingPlanWeeks', (ref) =>
        ref.where('trainingPlanId', '==', trainingPlanId).where('order', '==', weekOrder)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            console.log(a);
            const data = a.payload.doc.data() as TrainingWeek;
            data.id = a.payload.doc.id;
            data.days = this.getTrainingDaysDeep(data.id);

            return data;
          })
        )
      );
  }

  public addTrainingWeek(item: TrainingWeek) {
    return from(this.db.collection('trainingPlanWeeks').add(Object.assign({}, item)));
  }

  public addTrainingDay(item: TrainingDay) {
    return from(this.db.collection('trainingPlanDays').add(Object.assign({}, item)));
  }

  public addTrainingWork(item: TrainingWork) {
    return from(this.db.collection('trainingPlanLifts').add(Object.assign({}, item)));
  }

  public updateTrainingWork(item: TrainingWork) {
    return from(this.db.doc('trainingPlanLifts/' + item.id).update(Object.assign({}, item)));
  }

  public deleteTrainingWork(id: string) {
    return from(this.db.doc('trainingPlanLifts/' + id).delete());
  }
}
