import {
    ActionSpace,
    ActionSpaceId,
    EntityMutation,
    Game,
    PlayerId,
    Resources,
    ResourceType,
} from "../entity";
import { bookActionSpace, takeResources } from "./utils";

export const Excavation = {
    execute,
    createActionSpace,
};

const REPLENISH_RESOURCES = {
    ifEmpty: new Resources([[ResourceType.STONE, 2]]),
    ifNotEmpty: new Resources([[ResourceType.STONE, 1]]),
};

export function execute(game: Game, playerId: PlayerId): EntityMutation[] {
    const player = game.getPlayer(playerId);
    const actionSpace = game.actionBoard.getActionSpace(ActionSpaceId.EXCAVATION);
    return [...bookActionSpace(actionSpace, player), ...takeResources(actionSpace, player)];
}

function createActionSpace(): ActionSpace {
    return new ActionSpace(ActionSpaceId.EXCAVATION, execute, REPLENISH_RESOURCES);
}
