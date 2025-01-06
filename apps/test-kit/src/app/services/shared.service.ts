import { effect, Injectable, untracked } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';
import { DEFAULT_DEBOUNCE_TIME } from '../shared/constants';
import { TypedLocalStorage } from '../shared/interfaces';

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    public readonly idAttrCtrl = new FormControl(TypedLocalStorage.get('idAttrSelector') ?? 'data-testid');
    public readonly idAttrSelector = toSignal(
        this.idAttrCtrl.valueChanges.pipe(
            takeUntilDestroyed(),
            startWith(this.idAttrCtrl.value),
            debounceTime(DEFAULT_DEBOUNCE_TIME),
            distinctUntilChanged(),
            map((v) => v ?? ''),
        ),
        { initialValue: '' },
    );

    constructor() {
        effect(() => {
            this.idAttrSelector();

            untracked(() => {
                TypedLocalStorage.set('idAttrSelector', this.idAttrSelector());
                console.debug('idAttrSelector changed: ', this.idAttrSelector());
            });
        });
    }

    public showTestIds() {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            if (activeTab.id) {
                chrome.scripting.executeScript({
                    target: { tabId: activeTab.id },
                    func: addElements,
                });
            }
        });
    }

    public hideTestIds() {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            if (activeTab.id) {
                chrome.scripting.executeScript({
                    target: { tabId: activeTab.id },
                    func: removeElements,
                });
            }
        });
    }
}

function addElements() {
    const elementsWithTestId = document.querySelectorAll('[data-testid]');
    elementsWithTestId.forEach((el) => {
        const testIdValue = el.getAttribute('data-testid');

        const rect = document.createElement('div');
        rect.className = 'testkit-testID-display';
        rect.textContent = testIdValue;
        rect.style.position = 'absolute';
        rect.style.backgroundColor = 'red';
        rect.style.color = 'white';
        rect.style.padding = '5px 10px';
        rect.style.borderRadius = '4px';
        rect.style.fontSize = '12px';
        rect.style.cursor = 'pointer';
        rect.style.zIndex = '9999';
        rect.style.pointerEvents = 'auto';
        rect.style.transition = 'opacity 0.2s';
        rect.style.opacity = '0.8';

        const rectBounds = el.getBoundingClientRect();
        const rectWidth = rect.offsetWidth;
        const viewportWidth = window.innerWidth;
        if (rectBounds.right + 10 + rectWidth > viewportWidth) {
            rect.style.left = `${window.scrollX + rectBounds.left - rectWidth - 10}px`;
        } else {
            rect.style.left = `${window.scrollX + rectBounds.right + 10}px`;
        }
        rect.style.top = `${window.scrollY + rectBounds.top}px`;

        rect.addEventListener('click', (event) => {
            event.stopPropagation();
            event.preventDefault();

            if (testIdValue) {
                navigator.clipboard.writeText(testIdValue).then(() => {
                    rect.textContent = 'Copied!';
                    setTimeout(() => {
                        rect.textContent = testIdValue;
                    }, 500);
                });
            }
        });

        document.body.appendChild(rect);
    });
}

function removeElements() {
    const markers = document.querySelectorAll(`.${'testkit-testID-display'}`);
    markers.forEach((marker) => marker.remove());
}
