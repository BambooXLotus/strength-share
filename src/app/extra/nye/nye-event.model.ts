export class NyeEvent {
  constructor(
    public name: string,
    public price: number,
    public food: boolean,
    public bar: boolean,
    public location: string,
    public info: string
  ) {}

  id: string;
}
