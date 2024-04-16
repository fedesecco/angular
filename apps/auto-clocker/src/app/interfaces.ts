export interface ClockJob {
    title: string,
    clockTime: Date,
    active: boolean
}

export enum JobState {
    'scheduled' = 'scheduled',
    'unscheduled' = 'unscheduled',
    'done' = 'done',
}