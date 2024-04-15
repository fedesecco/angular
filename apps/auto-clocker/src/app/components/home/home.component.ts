import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../../services/state.service';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 't-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CommonModule ]
})
export class HomeComponent {
    constructor(protected router: Router, protected stateService: StateService){}
}
