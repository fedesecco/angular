import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    standalone: true,
    selector: 't-settings',
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss',
})
export class SettingsComponent {
    constructor(protected router: Router){}
}
