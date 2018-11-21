import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { TrainingWorkLoad } from '../training-work-load/training-work-load.model';
import { FirebaseService } from './../../firebase.service';
import { TrainingWorksSortComponent } from './../../training-works-sort/training-works-sort.component';
import { TrainingWorkAddComponent } from './training-work-add/training-work-add.component';
import { TrainingWorkAdd } from './training-work-add/training-work-add.model';
import { TrainingWork } from './training-work.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingWorkDialogService {
  constructor(private dialog: MatDialog, private firebaseService: FirebaseService) {}

  openAdd(trainingPlanDayId: string, workCount: number): void {
    const trainingWork = new TrainingWork(workCount + 1, 'Bench', 3, '3', 7, 6, 6 + '-' + (6 + 2), '3-4mins');
    const trainingWorkAdd = new TrainingWorkAdd(trainingWork, new TrainingWorkLoad('', 0, '0'));

    const dialogRef = this.dialog.open(TrainingWorkAddComponent, {
      width: '400px',
      data: trainingWorkAdd
    });

    dialogRef.afterClosed().subscribe((result: TrainingWorkAdd) => {
      if (result) {
        result.trainingWork.trainingPlanDayId = trainingPlanDayId;

        this.firebaseService.addTrainingWork(result.trainingWork).subscribe((s) => {
          console.log('deren');
          console.log(s);
          this.firebaseService.setTrainingWorkWeight(s.id, result.trainingWorkLoad).subscribe((s2) => console.log(s2));
        });
      }
    });
  }

  openEdit(selectedTrainingWork: TrainingWork, load: TrainingWorkLoad): void {
    const trainingWork = new TrainingWork(
      selectedTrainingWork.order,
      selectedTrainingWork.name,
      selectedTrainingWork.sets,
      selectedTrainingWork.setsDisplay,
      selectedTrainingWork.rpe,
      selectedTrainingWork.reps,
      selectedTrainingWork.repsDisplay,
      selectedTrainingWork.restTime
    );
    trainingWork.id = selectedTrainingWork.id;

    const trainingWorkAdd = new TrainingWorkAdd(trainingWork, load);

    const dialogRef = this.dialog.open(TrainingWorkAddComponent, {
      width: '500px',
      data: trainingWorkAdd
    });

    dialogRef.afterClosed().subscribe((result: TrainingWorkAdd) => {
      if (result) {
        this.firebaseService.updateTrainingWork(result.trainingWork).subscribe((s) => {
          this.firebaseService
            .setTrainingWorkWeight(selectedTrainingWork.id, result.trainingWorkLoad)
            .subscribe((s2) => console.log(s2));
        });
      }
    });
  }

  openSort(works: TrainingWork[]): void {
    const dialogRef = this.dialog.open(TrainingWorksSortComponent, {
      width: '500px',
      data: works
    });

    dialogRef.afterClosed().subscribe((results: TrainingWork[]) => {
      console.log(results);

      if (results) {
        for (let index = 0; index < results.length; index++) {
          results[index].order = index + 1;
        }

        for (const result of results) {
          this.firebaseService.updateTrainingWorkOrder(result).subscribe();
        }
      }
    });
  }
}
