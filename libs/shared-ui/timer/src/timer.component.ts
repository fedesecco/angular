import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'lib-timer',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './timer.component.html',
    styleUrl: './timer.component.scss',
})
export class TimerComponent {}
