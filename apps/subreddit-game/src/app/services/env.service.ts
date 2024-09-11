import { Injectable } from '@angular/core';
import * as env from '../../../env';

@Injectable({
    providedIn: 'root',
})
export class EnvService {
    public env = env;
}
