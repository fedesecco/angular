import { Injectable, computed, effect, signal, untracked } from '@angular/core';
import { ClockJob, JobState, Tab } from '../interfaces';
import { DEFAULT_STARTING_JOBS, SAVED_JOBS } from '../constants';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StateService {
    private _currentDate = signal(new Date());
    public currentDate = this._currentDate.asReadonly();
    public currentTime = computed(() => this.getDisplayDate(this.currentDate()));
    private _clockJobs = signal<ClockJob[]>(this.getStartingJobs());
    public clockJobs = this._clockJobs.asReadonly();

    constructor() {
        setInterval(() => {
            this._currentDate.set(new Date());
        }, 1000);

        effect(() => {
            localStorage.setItem(SAVED_JOBS, JSON.stringify(this.clockJobs()));
        });
    }

    public getJobState(job: ClockJob) {
        const time = new Date(job.clockTime.getTime());
        const jobTime = time.getTime() - time.setHours(0, 0, 0, 0);
        const currentTime = this.currentDate().getTime() - new Date().setHours(0, 0, 0, 0);

        if (!job.active) {
            return JobState.unscheduled;
        } else if (jobTime > currentTime) {
            return JobState.scheduled;
        } else if (!job.done) {
            return JobState.missed;
        } else {
            return JobState.done;
        }
    }

    public with0(n: number) {
        return n.toString().padStart(2, '0');
    }

    private getStartingJobs(): ClockJob[] {
        const rawJobs = localStorage.getItem(SAVED_JOBS);
        if (rawJobs) {
            return JSON.parse(rawJobs).map((j: ClockJob) => {
                j.clockTime = new Date(j.clockTime);
                return j;
            });
        } else {
            return DEFAULT_STARTING_JOBS;
        }
    }

    private getDisplayDate(d: Date) {
        return `${d.getHours()}:${this.with0(d.getMinutes())}:${this.with0(d.getSeconds())}`;
    }

    public isNextScheduled(i: number) {
        return i === this.clockJobs().findIndex((j) => this.getJobState(j) === JobState.scheduled);
    }

    public getRemainingTime(job: ClockJob) {
        let timeDifferenceInMilliseconds = job.clockTime.getTime() - this.currentDate().getTime();
        let hours = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));
        timeDifferenceInMilliseconds -= hours * (1000 * 60 * 60);
        const minutes = Math.floor(timeDifferenceInMilliseconds / (1000 * 60));
        timeDifferenceInMilliseconds -= minutes * (1000 * 60);
        const seconds = Math.floor(timeDifferenceInMilliseconds / 1000);
        if (hours < 0) {
            hours = 0;
        }
        return new Date().setHours(hours, minutes, seconds);
    }

    public checkIfTabIsOpen(urlFragment: Tab) {
        return new Observable((observer) => {
            chrome.runtime.sendMessage({ action: 'checkTab', urlFragment: urlFragment }, (response) => {
                if (chrome.runtime.lastError) {
                    observer.error(chrome.runtime.lastError);
                } else {
                    observer.next(response);
                    observer.complete();
                }
            });
        });
    }
}
