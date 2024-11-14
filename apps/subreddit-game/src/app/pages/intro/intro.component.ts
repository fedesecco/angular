import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'sr-intro',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './intro.component.html',
    styleUrl: './intro.component.scss',
})
export class IntroComponent {}
