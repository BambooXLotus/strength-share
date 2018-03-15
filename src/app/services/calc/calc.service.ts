import { Injectable } from '@angular/core';

import { LiftInput } from './../../input/lift-input/lift-input.model';
import { RPE } from './rpe.model';

@Injectable()
export class CalcService {
  constructor() {}

  calc(input: LiftInput): number {
    let returnValue = 0;
    const rpeTable = this.rpeTable();

    const calcRpe = rpeTable.filter(
      f => f.level === input.rpe && f.rep === input.reps
    );

    console.log(calcRpe);
    if (calcRpe && calcRpe.length > 0) {
      returnValue = input.weight / calcRpe[0].percent;
    }
    return returnValue;
  }

  private rpeTable(): Array<RPE> {
    return [
      new RPE(10, 1, 1),
      new RPE(10, 2, 0.959),
      new RPE(10, 3, 0.93),
      new RPE(10, 4, 0.902),
      new RPE(10, 5, 0.876),
      new RPE(10, 6, 0.852),
      new RPE(10, 7, 0.828),
      new RPE(10, 8, 0.805),
      new RPE(10, 9, 0.783),
      new RPE(10, 10, 0.762),
      new RPE(10, 11, 0.732),
      new RPE(10, 12, 0.707),
      new RPE(9.5, 1, 0.98),
      new RPE(9.5, 2, 0.945),
      new RPE(9.5, 3, 0.916),
      new RPE(9.5, 4, 0.889),
      new RPE(9.5, 5, 0.864),
      new RPE(9.5, 6, 0.84),
      new RPE(9.5, 7, 0.817),
      new RPE(9.5, 8, 0.794),
      new RPE(9.5, 9, 0.773),
      new RPE(9.5, 10, 0.747),
      new RPE(9.5, 11, 0.72),
      new RPE(9.5, 12, 0.695),
      new RPE(9, 1, 0.959),
      new RPE(9, 2, 0.93),
      new RPE(9, 3, 0.902),
      new RPE(9, 4, 0.876),
      new RPE(9, 5, 0.852),
      new RPE(9, 6, 0.828),
      new RPE(9, 7, 0.805),
      new RPE(9, 8, 0.783),
      new RPE(9, 9, 0.762),
      new RPE(9, 10, 0.732),
      new RPE(9, 11, 0.707),
      new RPE(9, 12, 0.681),
      new RPE(8.5, 1, 0.945),
      new RPE(8.5, 2, 0.916),
      new RPE(8.5, 3, 0.889),
      new RPE(8.5, 4, 0.864),
      new RPE(8.5, 5, 0.84),
      new RPE(8.5, 6, 0.817),
      new RPE(8.5, 7, 0.794),
      new RPE(8.5, 8, 0.773),
      new RPE(8.5, 9, 0.747),
      new RPE(8.5, 10, 0.72),
      new RPE(8.5, 11, 0.695),
      new RPE(8.5, 12, 0.681),
      new RPE(8, 1, 0.93),
      new RPE(8, 2, 0.902),
      new RPE(8, 3, 0.876),
      new RPE(8, 4, 0.852),
      new RPE(8, 5, 0.828),
      new RPE(8, 6, 0.805),
      new RPE(8, 7, 0.783),
      new RPE(8, 8, 0.762),
      new RPE(8, 9, 0.732),
      new RPE(8, 10, 0.707),
      new RPE(8, 11, 0.681),
      new RPE(8, 12, 0.656),
      new RPE(7.5, 1, 0.916),
      new RPE(7.5, 2, 0.889),
      new RPE(7.5, 3, 0.864),
      new RPE(7.5, 4, 0.84),
      new RPE(7.5, 5, 0.817),
      new RPE(7.5, 6, 0.794),
      new RPE(7.5, 7, 0.773),
      new RPE(7.5, 8, 0.747),
      new RPE(7.5, 9, 0.72),
      new RPE(7.5, 10, 0.695),
      new RPE(7.5, 11, 0.669),
      new RPE(7.5, 11, 0.644),
      new RPE(7, 1, 0.902),
      new RPE(7, 2, 0.876),
      new RPE(7, 3, 0.852),
      new RPE(7, 4, 0.828),
      new RPE(7, 5, 0.805),
      new RPE(7, 6, 0.783),
      new RPE(7, 7, 0.762),
      new RPE(7, 8, 0.732),
      new RPE(7, 9, 0.707),
      new RPE(7, 10, 0.681),
      new RPE(7, 11, 0.656),
      new RPE(7, 12, 0.63),
      new RPE(6.5, 1, 0.889),
      new RPE(6.5, 2, 0.864),
      new RPE(6.5, 3, 0.84),
      new RPE(6.5, 4, 0.817),
      new RPE(6.5, 5, 0.794),
      new RPE(6.5, 6, 0.773),
      new RPE(6.5, 7, 0.747),
      new RPE(6.5, 8, 0.72),
      new RPE(6.5, 9, 0.695),
      new RPE(6.5, 10, 0.669),
      new RPE(6.5, 11, 0.644),
      new RPE(6.5, 12, 0.618)
    ];
  }
}
