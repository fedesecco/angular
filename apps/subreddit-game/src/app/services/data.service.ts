import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RedditApiObj, RedditPostData } from '@fsecco/shared-ui/reddit-interfaces';
import { map, shareReplay, switchMap } from 'rxjs';
import { RedditApiService } from './reddit-api.service';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private redditApiService = inject(RedditApiService);
    private http = inject(HttpClient);

    public getRedditPosts() {
        return this.redditApiService.getAppOnlyToken().pipe(
            switchMap((tokenResponse) => {
                const token = tokenResponse.access_token;
                const headers = new HttpHeaders({
                    Authorization: `Bearer ${token}`,
                });
                return this.http.get<RedditApiObj>(`https://oauth.reddit.com/best?limit=100`, { headers });
            }),
            map((d) => d.data as RedditPostData[]),
            shareReplay(1),
        );
    }
}
