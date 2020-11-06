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

export const GatherWood = {
    execute,
    createActionSpace,
};

const REPLENISH_RESOURCES = {
    ifEmpty: new Resources([[ResourceType.WOOD, 1]]),
    ifNotEmpty: new Resources([[ResourceType.WOOD, 1]]),
};

function execute(game: Game, playerId: PlayerId): EntityMutation[] {
    const actionSpaceId = ActionSpaceId.GATHER_WOOD;
    const player = game.getPlayer(playerId);
    const actionSpace = game.actionBoard.getActionSpace(actionSpaceId);
    return [...bookActionSpace(actionSpace, player), ...takeResources(actionSpace, player)];
}

function createActionSpace(): ActionSpace {
    return new ActionSpace(ActionSpaceId.GATHER_WOOD, execute, REPLENISH_RESOURCES);
}
