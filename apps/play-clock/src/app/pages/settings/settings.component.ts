import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from 'fsecco/timer';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [CommonModule, TimerComponent],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss',
})
export class SettingsComponent {}
