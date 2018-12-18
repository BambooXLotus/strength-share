import { Observable } from 'rxjs';

export class NyeEvent {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public food: boolean,
    public bar: boolean,
    public location: string,
    public info: string,
    public vote: Observable<any>
  ) {}
}
