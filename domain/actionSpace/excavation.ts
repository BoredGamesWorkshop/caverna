import {
    ActionSpace,
    ActionSpaceId,
    assertIsTile,
    Choice,
    EntityMutation,
    Game,
    PlayerId,
    Resources,
    ResourceType,
} from "../entity";
import { bookActionSpace, placeTile, takeResources } from "./utils";

export const Excavation = {
    execute,
    createActionSpace,
};

const REPLENISH_RESOURCES = {
    ifEmpty: new Resources([[ResourceType.STONE, 2]]),
    ifNotEmpty: new Resources([[ResourceType.STONE, 1]]),
};

function execute(game: Game, playerId: PlayerId, [chosenTile]: Choice[]): EntityMutation[] {
    assertIsTile(chosenTile);
    const player = game.getPlayer(playerId);
    const actionSpace = game.actionBoard.getActionSpace(ActionSpaceId.EXCAVATION);
    return [
        ...bookActionSpace(actionSpace, player),
        ...takeResources(actionSpace, player),
        ...placeTile(chosenTile, player),
    ];
}

function createActionSpace(): ActionSpace {
    return new ActionSpace(ActionSpaceId.EXCAVATION, execute, REPLENISH_RESOURCES);
}
