export function displayMs(ms: number) {
    const pad = (n: number, z = 2) => ('00' + n).slice(-z);
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    return `${hours}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 3)}`;
}
