import { IPlayer } from "./IPlayer";

export interface IMatch {
    name: string,
    max: number,
    id: string,
    size: number,
    players: IPlayer[],
}