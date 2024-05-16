import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StateService } from '@services/state.service';

@Component({
    standalone: true,
    selector: 't-home',
    templateUrl: './home.component.html',
    imports: [CommonModule],
})
export class HomeComponent {
    protected router = inject(Router);
    protected stateService = inject(StateService);
}
