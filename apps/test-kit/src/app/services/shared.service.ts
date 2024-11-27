import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    private readonly addedClass = 'floating-rect-marker';

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
    alert('ewrtew');
    elementsWithTestId.forEach((el) => {
        const rect = document.createElement('div');
        rect.className = 'floating-rect-marker';
        rect.textContent = el.getAttribute('data-testid');
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
        rect.style.top = `${window.scrollY + rectBounds.top}px`;
        rect.style.left = `${window.scrollX + rectBounds.right + 10}px`;

        rect.addEventListener('click', (event) => {
            event.stopPropagation();
            event.preventDefault();

            const dataTestId = el.getAttribute('data-testid');
            if (dataTestId) {
                navigator.clipboard.writeText(dataTestId).then(() => {
                    rect.textContent = 'Copied!';
                    setTimeout(() => {
                        rect.textContent = 'Copy ID';
                    }, 1000);
                });
            }
        });

        document.body.appendChild(rect);
    });
}

function removeElements() {
    const markers = document.querySelectorAll(`.${'floating-rect-marker'}`);
    markers.forEach((marker) => marker.remove());
}
