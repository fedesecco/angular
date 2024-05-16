export const DEFAULT_STARTING_JOBS = [
    {
        title: 'Entrata alla mattina',
        active: true,
        clockTime: new Date(0, 0, 0, 8, 30),
        done: false,
    },
    {
        title: 'Uscita pausa pranzo',
        active: true,
        clockTime: new Date(0, 0, 0, 12, 30),
        done: false,
    },
    {
        title: 'Entrata dalla pausa pranzo',
        active: true,
        clockTime: new Date(0, 0, 0, 13, 30),
        done: false,
    },
    {
        title: 'Entrata alla sera',
        active: true,
        clockTime: new Date(0, 0, 0, 17, 30),
        done: false,
    },
];
export const SAVED_JOBS = 'AutoClockSavedJobs';
export const PEOPLE_SMART_URL = 'https://peoplesmart.hrzucchetti.it/psmartmo02022/Content/browser/www/home-new-updated';
