export class MuscleGroup {
  constructor(
    public name: string,
    public mrv: number,
    public mavMin: number,
    public mavMax: number,
    public mev: number,
    public mv: number
  ) {}

  id: string;
}
