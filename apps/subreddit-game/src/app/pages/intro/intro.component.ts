import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'sr-intro',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './intro.component.html',
    styleUrl: './intro.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroComponent {}
