export class TrainingWork {
  constructor(
    public order: number,
    public name: string,
    public weight: string,
    public sets: string,
    public rpe: number,
    public reps: number,
    public restTime: string
  ) {}

  id: string;
}
