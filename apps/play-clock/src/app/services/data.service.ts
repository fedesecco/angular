import { computed, effect, Injectable, signal, untracked } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Player, PlayerColor } from '../interfaces';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    public activePlayers = signal<Player[]>(this.getLocalStorageItem('activePlayers', []));
    public readonly allColors = Object.values(PlayerColor);
    public unusedColors = computed(() => {
        let result = [...this.allColors];
        return result.filter(
            (i) =>
                !this.activePlayers()
                    .map((p) => p.color)
                    .includes(i),
        );
    });
    public globalTime = signal<boolean>(this.getLocalStorageItem('globalTime', true));
    public playerPlayingIndex = signal<number | null>(null);
    public currentPlayer = computed(() => {
        if (this.playerPlayingIndex() === null) {
            return null;
        } else return this.activePlayers()[this.playerPlayingIndex()!];
    });
    public nextPlayerIndex = computed(() => {
        if (this.playerPlayingIndex() === null) {
            return null;
        } else if (this.playerPlayingIndex() === this.activePlayers().length - 1) {
            return 0;
        } else return this.playerPlayingIndex()! + 1;
    });
    public nextPlayer = computed(() => {
        if (this.nextPlayerIndex() === null) {
            return null;
        } else return this.activePlayers()[this.nextPlayerIndex()!];
    });

    constructor() {
        effect(() => {
            this.activePlayers();

            untracked(() => {
                console.log('activePlayers changed: ', this.activePlayers());
                localStorage.setItem('activePlayers', JSON.stringify(this.activePlayers()));
            });
        });
        effect(() => {
            console.log('unusedColors changed: ', this.unusedColors());
        });
        effect(() => {
            this.globalTime();

            untracked(() => {
                console.log('globalTime changed: ', this.globalTime());
                localStorage.setItem('globalTime', JSON.stringify(this.globalTime()));
            });
        });
        effect(() => {
            console.log('currentPlayer changed: ', this.currentPlayer());
        });
    }

    public addPlayer() {
        this.activePlayers.update((p) => [
            ...p,
            {
                color: this.unusedColors()[0] ?? PlayerColor.Red,
                timer: 1000 * 60 * 10,
                id: uuid(),
            },
        ]);
    }
    public removePlayer(index: number) {
        this.activePlayers.update((p) => p.filter((_, i) => index != i));
    }
    public nextColor(color: PlayerColor) {
        if (this.unusedColors().length) {
            return this.unusedColors()[Math.floor(Math.random() * this.unusedColors().length)];
        } else {
            const index = this.allColors.indexOf(color);
            if (index === this.allColors.length - 1) {
                return this.allColors[0];
            } else return this.allColors[index + 1];
        }
    }
    public changePlayerColor(index: number) {
        let players = [...this.activePlayers()];
        const player = players[index];
        player.color = this.nextColor(player.color);
        players[index] = player;
        this.activePlayers.set([...players]);
    }

    private getLocalStorageItem(item: string, valueIfNotPresent: number | boolean | string | Array<any> | Object) {
        const itemFromStorage = localStorage.getItem(item);
        if (itemFromStorage) {
            return JSON.parse(itemFromStorage);
        } else return valueIfNotPresent;
    }
}
