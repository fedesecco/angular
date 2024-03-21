import { Component, signal } from '@angular/core';
import { FakeIonLabelComponent } from './comps/ion-label';
import { CounterComponent } from './comps/counter';

@Component({
    standalone: true,
    imports: [FakeIonLabelComponent, CounterComponent],
    selector: 'pst-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    public b1 = signal(0);
    public b2 = signal(0);
}
