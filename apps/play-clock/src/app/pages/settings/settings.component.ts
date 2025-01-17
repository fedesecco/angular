import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { DataService } from '@services/data.service';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-settings',
    imports: [
        CommonModule,
        TranslocoModule,
        ButtonModule,
        InputTextModule,
        FormsModule,
        ReactiveFormsModule,
        InputNumberModule,
        TableModule,
        InputSwitchModule,
    ],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss'
})
export class SettingsComponent {
    protected dataService = inject(DataService);
    private router = inject(Router);

    protected pageNotReady() {
        return (
            this.dataService.activePlayers().length < 2 ||
            this.dataService.activePlayers().some((player) => (player?.name ?? '').length === 0)
        );
    }
    protected onReadyClick() {
        this.dataService.activePlayers.set([...this.dataService.activePlayers()]);
        this.router.navigate(['play']);
    }
}
