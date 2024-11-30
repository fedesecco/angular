import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    standalone: true,
    imports: [ButtonModule],
    selector: 'tk-footer',
    templateUrl: './footer.component.html',
})
export class FooterComponent {}
