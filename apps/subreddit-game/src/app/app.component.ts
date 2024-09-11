import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from './services/data.service';

@Component({
    standalone: true,
    imports: [RouterModule],
    selector: 'sr-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    private aa = inject(DataService);
}
