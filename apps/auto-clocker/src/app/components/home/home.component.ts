import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StateService } from '@services/state.service';
import { CheckTabComponent } from '../check-tab/check-tab.component';

@Component({
    selector: 't-home',
    templateUrl: './home.component.html',
    imports: [CommonModule, CheckTabComponent]
})
export class HomeComponent {
    protected router = inject(Router);
    protected stateService = inject(StateService);
}
