import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { interval } from 'rxjs';
import { SharedService } from '../../services/shared.service';

@Component({
    selector: 'tk-home',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, InputTextModule, FloatLabelModule, ButtonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {
    protected sharedServ = inject(SharedService);
    protected tot = signal(0);
    constructor() {
        interval(100).subscribe({
            next: () => {
                this.tot.set(this.tot() + 5);
            },
        });
    }
}
