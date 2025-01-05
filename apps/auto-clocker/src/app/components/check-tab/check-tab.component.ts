import { Component, inject, signal } from '@angular/core';
import { StateService } from '@services/state.service';
import { first, fromEventPattern } from 'rxjs';
import { Tab } from 'src/app/interfaces';

@Component({
    selector: 't-check-tab',
    templateUrl: './check-tab.component.html',
    imports: []
})
export class CheckTabComponent {
    private stateService = inject(StateService);
    protected idk = signal<unknown>(null);
    constructor() {
        this.stateService
            .checkIfTabIsOpen(Tab.Test)
            .pipe(first())
            .subscribe({
                next: (res) => {
                    this.idk.set(res);
                },
                error: (e) => {
                    this.idk.set(e);
                },
            });
    }
}
