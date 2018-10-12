import { TrainingWork } from './training-work.model';

export class TrainingDay {
  constructor() {
    this.works = [];
  }

  id: string;
  name: string;
  order: number;
  works: TrainingWork[];
}
