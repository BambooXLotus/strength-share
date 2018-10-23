export class TrainingWork {
  constructor(
    public order: number,
    public name: string,
    public weight: string,
    public sets: string,
    public reps: string,
    public restTime: string
  ) {}

  id: string;
}
