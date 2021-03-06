import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { finalize, map, share, shareReplay, filter } from 'rxjs/operators';

import { EventVote } from './extra/nye/event-vote.model';
import { MuscleGroup } from './muscle-group/muscle-group.model';
import { Profile } from './profile/profile.model';
import { ProfileService } from './profile/profile.service';
import { TrainingDay } from './training-plan/training-day/training-day.model';
import { TrainingPlan } from './training-plan/training-plan.model';
import { TrainingWeekMax } from './training-plan/training-week/training-week-max.model';
import { TrainingWeek } from './training-plan/training-week/training-week.model';
import { TrainingWorkLoad } from './training-plan/training-work-load/training-work-load.model';
import { TrainingWork } from './training-plan/training-work/training-work.model';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private profileService: ProfileService
  ) {}

  public getProfiles(): Observable<Profile[]> {
    return this.db
      .collection<Profile>('profiles')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Profile;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

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
      )
      .pipe(share());
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

  public updateTrainingPlanDetail(item: TrainingPlan) {
    return from(this.db.doc('trainingPlans/' + item.id).update({ detail: item.detail }));
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

  public getTrainingWeek(trainingWeekId: string) {
    return this.db
      .doc('trainingPlanWeeks/' + trainingWeekId)
      .snapshotChanges()
      .pipe(
        map((a) => {
          const data = a.payload.data() as TrainingWeek;
          data.id = a.payload.id;
          data.days = this.getTrainingDaysDeep(data.id);

          return data;
        })
      );
  }

  private getTrainingWeeksDeep(trainingPlanId: string): Observable<TrainingWeek[]> {
    return this.db
      .collection<TrainingWeek>(`trainingPlanWeeks`, (ref) =>
        ref.where('trainingPlanId', '==', trainingPlanId).orderBy('order', 'desc')
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as TrainingWeek;
            data.id = a.payload.doc.id;
            data.days = this.getTrainingDaysDeep(data.id);
            data.max = this.getTrainingWeekMax(data.id).pipe(shareReplay());

            return data;
          })
        )
      );
  }

  public getTrainingWeekMax(trainingWeekId: string) {
    const profileId = this.profileService.currentUserProfile().id;
    const path = `trainingPlanWeekMax/${trainingWeekId}_${profileId}`;

    return this.db
      .doc(path)
      .snapshotChanges()
      .pipe(
        map((a) => {
          const data = a.payload.data() as TrainingWeekMax;

          const id = a.payload.id;
          return { id, ...data };
        })
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
            const data = a.payload.doc.data() as TrainingWork;
            data.id = a.payload.doc.id;
            data.load = this.getTrainingWorkLoad(data.id).pipe(share());

            return data;
          })
        )
      );
  }

  public getTrainingWorksByUser(userName: string): Observable<TrainingWork[]> {
    return this.db
      .collection<TrainingWork>(`trainingPlanLifts`)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as TrainingWork;
            data.id = a.payload.doc.id;
            data.load = this.getTrainingWorkLoad(data.id).pipe(filter((res) => res.id.endsWith(userName)));

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

    console.log(trainingLoad);
    return from(
      this.db.doc(workWeightPath).set({
        load: trainingLoad.load,
        loadDisplay: trainingLoad.loadDisplay
      })
    );
  }

  public setTrainingWorkResult(trainingWorkId: string, trainingLoad: TrainingWorkLoad) {
    const profileId = this.profileService.currentUserProfile().id;
    const workWeightPath = `trainingPlanLiftLoads/${trainingWorkId}_${profileId}`;

    return from(
      this.db.doc(workWeightPath).set({
        load: trainingLoad.load,
        loadDisplay: trainingLoad.loadDisplay,
        resultLoad: trainingLoad.resultLoad,
        resultRpe: trainingLoad.resultRpe,
        resultNote: trainingLoad.resultNote,
        resultDate: new Date()
      })
    );
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

  public getTrainingDayDeepByOrder(trainingPlanId: string, weekOrder: number, dayOrder: number) {
    this.db
      .collection<TrainingWeek>('trainingPlanWeeks', (ref) =>
        ref.where('trainingPlanId', '==', trainingPlanId).where('order', '==', weekOrder)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as TrainingWeek;
            data.id = a.payload.doc.id;
            data.days = this.getTrainingDaysDeep(data.id);

            return data;
          })
        )
      );
  }

  public getTrainingDayDeep(trainingDayId: string): Observable<TrainingDay> {
    return this.db
      .doc<TrainingDay>('trainingPlanDays/' + trainingDayId)
      .snapshotChanges()
      .pipe(
        map((a) => {
          const data = a.payload.data() as TrainingDay;

          data.id = a.payload.id;
          data.works = this.getTrainingWorksDeep(data.id);

          return data;
        })
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

  public updateTrainingWorkOrder(item: TrainingWork) {
    return from(this.db.doc('trainingPlanLifts/' + item.id).update({ order: item.order }));
  }

  public deleteTrainingWork(id: string) {
    return from(this.db.doc('trainingPlanLifts/' + id).delete());
  }

  public uploadPhoto(photo: any) {
    const fileName = 'profile_' + this.profileService.currentUserProfile().id + Math.random() * 100 + 1;
    const photoRef = this.storage.ref(fileName);

    const task = this.storage.upload(fileName, photo);

    task
      .snapshotChanges()
      .pipe(
        finalize(() =>
          photoRef.getDownloadURL().subscribe((downloadUrl) => {
            this.db
              .doc<Profile>('profiles/' + this.profileService.currentUserProfile().id)
              .update({ photo: downloadUrl });
          })
        )
      )
      .subscribe();
  }

  public getMuscleGroups() {
    return this.db
      .collection<MuscleGroup>('muscleGroups')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as MuscleGroup;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  public addMuscleGroup(item: MuscleGroup) {
    return from(this.db.collection('muscleGroups').add(Object.assign({}, item)));
  }

  //   public saveMaxToWeek(weekId: string) {
  //     const squatMax = this.profileService.currentUserProfile().squatMax;
  //     const benchMax = this.profileService.currentUserProfile().benchMax;
  //     const deadliftMax = this.profileService.currentUserProfile().deadliftMax;

  //     return from(
  //       this.db
  //         .doc<TrainingWeek>('trainingPlanWeeks/' + weekId)
  //         .update({ benchMax: benchMax, squatMax: squatMax, deadliftMax: deadliftMax })
  //     );
  //   }

  public setTrainingPlanWeekMaxFromProfile(weekId: string, profileId: string) {
    const squatMax = this.profileService.currentUserProfile().squatMax;
    const benchMax = this.profileService.currentUserProfile().benchMax;
    const deadliftMax = this.profileService.currentUserProfile().deadliftMax;

    return this.setTrainingPlanWeekMax(weekId, profileId, squatMax, benchMax, deadliftMax);
  }

  public setTrainingPlanWeekMax(
    weekId: string,
    profileId: string,
    squatMax: number,
    benchMax: number,
    deadliftMax: number
  ) {
    const trainingPlanPath = `trainingPlanWeekMax/${weekId}_${profileId}`;

    return from(
      this.db.doc(trainingPlanPath).set({
        benchMax: benchMax,
        squatMax: squatMax,
        deadliftMax: deadliftMax,
        date: new Date()
      })
    );
  }

  public updateProfileNotes(notes: string) {
    return from(
      this.db.doc<Profile>('profiles/' + this.profileService.currentUserProfile().id).update({ notes: notes })
    );
  }

  public getVotes(id: string) {
    return this.db
      .doc<EventVote>('event-vote/' + id)
      .collection('votes')
      .snapshotChanges();
  }

  public addVote(id: string) {
    return from(
      this.db
        .doc(`event-vote/${id}`)
        .collection('votes')
        .add({})
    );
  }
}
