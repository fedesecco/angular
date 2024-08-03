import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DataService } from '@services/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [
        CommonModule,
        TranslocoModule,
        ButtonModule,
        InputTextModule,
        FormsModule,
        ReactiveFormsModule,
        InputNumberModule,
    ],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss',
})
export class SettingsComponent {
    protected dataService = inject(DataService);

    protected pageNotReady() {
        return this.dataService.activePlayers().some((player) => (player?.name ?? '').length === 0);
    }
}
