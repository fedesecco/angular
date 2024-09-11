import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';

@Injectable({
    providedIn: 'root',
})
export class RedditApiService {
    private http = inject(HttpClient);
    private envService = inject(EnvService);

    getAppOnlyToken(): Observable<any> {
        const body = 'grant_type=client_credentials';
        const headers = new HttpHeaders({
            Authorization: `Basic ${btoa(`${this.envService.env.REDDIT_CLIENT_ID}:${this.envService.env.REDDIT_CLIENT_SECRET}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return this.http.post(this.envService.env.REDDIT_AUTH_URL, body, { headers });
    }
}
