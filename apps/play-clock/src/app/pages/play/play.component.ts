import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { displayMs } from '@functions';
import { TranslocoModule } from '@jsverse/transloco';
import { DataService } from '@services/data.service';
import { ButtonModule } from 'primeng/button';
import { filter, interval, startWith, withLatestFrom } from 'rxjs';

@Component({
    selector: 'app-play',
    imports: [CommonModule, ButtonModule, TranslocoModule],
    templateUrl: './play.component.html',
    styleUrl: './play.component.scss'
})
export class PlayComponent implements OnDestroy {
    private router = inject(Router);
    protected dataService = inject(DataService);
    protected displayMs = displayMs;

    protected timerPaused = signal(true);
    protected playBtnClass = computed(() => (this.timerPaused() ? 'pi pi-play-circle' : 'pi pi-pause-circle'));
    protected readonly playersStartTime = this.dataService.activePlayers().map((p) => p.timer);

    constructor() {
        this.dataService.playerPlayingIndex.set(0);

        interval(100)
            .pipe(
                takeUntilDestroyed(),
                withLatestFrom(toObservable(this.timerPaused).pipe(startWith(this.timerPaused()))),
                filter(([_, p]) => !p),
            )
            .subscribe({
                next: () => {
                    if (this.dataService.currentPlayer()!.timer > 0) {
                        this.dataService.activePlayers.update((old) => {
                            const res = [...old];
                            res[this.dataService.playerPlayingIndex()!].timer =
                                res[this.dataService.playerPlayingIndex()!].timer - 100;
                            return res;
                        });
                    }
                },
            });
    }

    protected onSettingsClick() {
        this.router.navigate(['settings']);
    }
    protected onNextPlayerClick() {
        if (this.dataService.globalTime() === false) {
            this.dataService.activePlayers.update((old) => {
                const res = [...old];
                res[this.dataService.playerPlayingIndex()!].timer =
                    this.playersStartTime[this.dataService.playerPlayingIndex()!];
                return res;
            });
        }
        this.dataService.playerPlayingIndex.set(this.dataService.nextPlayerIndex());
    }

    ngOnDestroy(): void {
        this.dataService.playerPlayingIndex.set(null);
        this.dataService.activePlayers.update((old) => {
            const res = [...old];
            res.forEach((p, i) => {
                p.timer = this.playersStartTime[i];
            });
            return res;
        });
    }
}
