import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { env } from '@subredditgame/shared/constants';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RedditApiService {
    private readonly http = inject(HttpClient);
    getAppOnlyToken(): Observable<any> {
        const body = 'grant_type=client_credentials';
        const headers = new HttpHeaders({
            Authorization: `Basic ${btoa(`${env.REDDIT_CLIENT_ID}:${env.REDDIT_CLIENT_SECRET}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return this.http.post('https://www.reddit.com/api/v1/access_token', body, { headers }).pipe(shareReplay(1));
    }
}
