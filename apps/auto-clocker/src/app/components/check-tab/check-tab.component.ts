import { Component } from '@angular/core';

import { fromEventPattern } from 'rxjs';

@Component({
    standalone: true,
    selector: 't-check-tab',
    templateUrl: './check-tab.component.html',
    imports: [],
})
export class CheckTabComponent {
    /* protected test = chrome.runtime.sendMessage({ action: 'checkTab', url: PEOPLE_SMART_URL }, (response) => {
        if (response.found) {
            console.log('The tab is open!');
        } else {
            console.log('The tab is not open.');
        }
    }); */

    protected messages = fromEventPattern(
        (handler) => {
            const wrapper = (request, sender, sendResponse) => {
                const event = { async: false, request, sender, sendResponse };
                handler(event);
                return event.async;
            };
            chrome.runtime.onMessage.addListener(wrapper);
            return wrapper;
        },
        (handler, wrapper) => chrome.runtime.onMessage.removeListener(wrapper),
    );
}
