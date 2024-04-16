import { Injectable, computed, signal } from '@angular/core';
import { ClockJob, JobState } from '../interfaces';

@Injectable({
    providedIn: 'root',
})
export class StateService {
    private _currentDate = signal(new Date());
    public currentDate = this._currentDate.asReadonly();
    public currentTime = computed(
        () => `${this.currentDate().getHours()}:${this.with0(this.currentDate().getMinutes())}:${this.with0(this.currentDate().getSeconds())}`,
    );
    private _clockJobs = signal<ClockJob[]>([
        {
            title: 'Entrata alla mattina',
            active: true,
            clockTime: new Date(0, 0, 0, 8, 30),
        },
        {
            title: 'Uscita pausa pranzo',
            active: true,
            clockTime: new Date(0, 0, 0, 12, 30),
        },
        {
            title: 'Entrata dalla pausa pranzo',
            active: true,
            clockTime: new Date(0, 0, 0, 13, 30),
        },
        {
            title: 'Entrata alla sera',
            active: true,
            clockTime: new Date(0, 0, 0, 17, 30),
        },
    ]);
    public clockJobs = this._clockJobs.asReadonly();

    public getJobState(job: ClockJob) {
        const localJob = { ...job };
        const jobTime = job.clockTime.getTime() - localJob.clockTime.setHours(0, 0, 0, 0);
        const currentTime = this.currentDate().getTime() - new Date().setHours(0, 0, 0, 0);

        if (!job.active) {
            return JobState.unscheduled;
        } else if (jobTime > currentTime) {
            return JobState.scheduled;
        } else {
            return JobState.done;
        }
    }

    constructor() {
        setInterval(() => {
            this._currentDate.set(new Date());
        }, 1000);
    }

    public with0(n: number) {
        return n.toString().padStart(2, '0');
    }
}
