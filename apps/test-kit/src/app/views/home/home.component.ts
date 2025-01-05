import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
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
}
