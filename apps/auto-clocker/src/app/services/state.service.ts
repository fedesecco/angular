import { Injectable, signal } from '@angular/core';
import { ClockJob } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StateService {
    private _clockJobs = signal<ClockJob[]>([
        {
            title: 'Entrata alla mattina',
            active: true,
            clockTime: new Date(0,0,0,8,30)
        },
        {
            title: 'Uscita pausa pranzo',
            active: true,
            clockTime: new Date(0,0,0,12,30)
        },
        {
            title: 'Entrata dalla pausa pranzo',
            active: true,
            clockTime: new Date(0,0,0,13,30)
        },
        {
            title: 'Entrata alla sera',
            active: true,
            clockTime: new Date(0,0,0,17,30)
        },
    ]);
    clockJobs = this._clockJobs.asReadonly();
}
