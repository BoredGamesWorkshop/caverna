import { ActionBoard, Dwarf, Game, Player } from "./entity";
import { GatherWood, UrgentWishForChildren } from "./actionSpace";

export function buildInitialGame(): Game {
    return new Game(buildInitialActionBoard(), [buildInitialPlayer()]);
}

export function buildInitialActionBoard(): ActionBoard {
    return new ActionBoard([
        GatherWood.createActionSpace(),
        UrgentWishForChildren.createActionSpace(),
    ]);
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
