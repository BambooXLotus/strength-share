import { TrainingWork } from './training-work.model';

export class TrainingDay {
  constructor(public name: string, public order: number) {
    this.works = [];
  }

  id: string;
  works: TrainingWork[];
}
