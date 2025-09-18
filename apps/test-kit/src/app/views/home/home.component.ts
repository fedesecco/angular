
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { HeaderComponent } from '../../components/header/header.component';
import { SharedService } from '../../services/shared.service';

@Component({
    selector: 'tk-home',
    standalone: true,
    imports: [
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    HeaderComponent
],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {
    protected sharedServ = inject(SharedService);
}
