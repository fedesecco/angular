import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { env } from '@shared/constants';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RedditApiService {
    private http = inject(HttpClient);

    getAppOnlyToken(): Observable<any> {
        const body = 'grant_type=client_credentials';
        const headers = new HttpHeaders({
            Authorization: `Basic ${btoa(`${env.REDDIT_CLIENT_ID}:${env.REDDIT_CLIENT_SECRET}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return this.http.post(env.REDDIT_AUTH_URL, body, { headers }).pipe(shareReplay(1));
    }
}
