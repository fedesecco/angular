export interface Player {
    name?: string;
    /** In milliseconds */
    timer: number;
    color: PlayerColor;
    id: string;
}

export enum PlayerColor {
    Red = '#FF0000',
    Green = '#00FF00',
    Blue = '#0000FF',
    Yellow = '#FFFF00',
    Cyan = '#00FFFF',
    Magenta = '#FF00FF',
    Black = '#000000',
    White = '#FFFFFF',
}
