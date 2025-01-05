import { Component, signal } from '@angular/core';

@Component({
    imports: [],
    selector: 'pst-counter',
    template: `
        <div (click)="counter.set(counter() + 1)">
            <ng-content></ng-content>
        </div>
        <span>Cliccato {{ counter() }} volte</span>
    `
})
export class CounterComponent {
    protected counter = signal(0);
}
