import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, switchMap } from 'rxjs';
import { RedditApiService } from './reddit-api.service';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private redditApiService = inject(RedditApiService);
    private http = inject(HttpClient);

    public getRedditPosts(): Observable<any> {
        return this.redditApiService.getAppOnlyToken().pipe(
            switchMap((tokenResponse) => {
                const token = tokenResponse.access_token;
                const headers = new HttpHeaders({
                    Authorization: `Bearer ${token}`,
                });
                return this.http.get(`https://oauth.reddit.com/best?limit=100`, { headers });
            }),
        );
    }

    constructor() {
        this.getRedditPosts()
            .pipe(takeUntilDestroyed())
            .subscribe({
                next: (d) => console.log(d),
                error: (e) => console.error(e),
            });
    }
}
