import { ActionBoard, FurnishingBoard, Game, Player } from "./entity";
import { GatherWood, UrgentWishForChildren } from "./actionSpace";
import { Dwelling } from "./furnishing";
import { EntityFactory } from "./util";

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
    return EntityFactory.createPlayer(DWARFS_NUMBER);
}
