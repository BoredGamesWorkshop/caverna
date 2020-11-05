import { ActionBoard, Dwarf, FurnishingBoard, Game, Player } from "./entity";
import { GatherWood, UrgentWishForChildren } from "./actionSpace";
import { Dwelling } from "./furnishing";

export function buildInitialGame(): Game {
    return new Game(buildInitialActionBoard(), buildInitialFurnishingBoard(), [
        buildInitialPlayer(),
    ]);
}

export function buildInitialActionBoard(): ActionBoard {
    return new ActionBoard([
        GatherWood.createActionSpace(),
        UrgentWishForChildren.createActionSpace(),
    ]);
}

export function buildInitialFurnishingBoard(): FurnishingBoard {
    return new FurnishingBoard([Dwelling.createFurnishing()]);
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
