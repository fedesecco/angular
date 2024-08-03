import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Player, PlayerColor } from '../interfaces';
import { v4 as uuid } from 'uuid';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    public activePlayers = signal<Player[]>([]);
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

    constructor() {
        effect(() => {
            console.log('activePlayers changed: ', this.activePlayers());
        });
        effect(() => {
            console.log('unusedColors changed: ', this.unusedColors());
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
}
