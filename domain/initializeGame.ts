import { GatherWood } from "./gatherWood";
import { ActionBoard, Game } from "./Game";
import { Dwarf, Player } from "./Player";

export function buildInitialGame(): Game {
    return new Game(buildInitialActionBoard(), [buildInitialPlayer()]);
}

export function buildInitialActionBoard() {
    return new ActionBoard([GatherWood.createActionSpace()]);
}

export function buildInitialPlayer(): Player {
    const DWARFS_NUMBER = 2;
    const player = new Player();
    for (let i = 0; i < DWARFS_NUMBER; i++) {
        addDwarf();
    }
    return player;

    function addDwarf() {
        const dwarf = new Dwarf();
        player.dwarfs.set(dwarf.id, dwarf);
    }
}
