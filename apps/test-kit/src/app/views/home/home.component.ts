import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
    selector: 'tk-home',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {
    protected sharedServ = inject(SharedService);
}
