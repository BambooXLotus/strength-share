import { TrainingWork } from './training-work.model';

export class TrainingWeek {
  constructor() {}

  id: string;
  name: string;
  order: number;

  days: TrainingWork[];
}
