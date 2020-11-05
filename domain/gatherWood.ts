import { Game } from "./entity/Game";
import { EntityMutation, EntityType } from "./entity/Mutation";
import { PlayerId } from "./entity/Player";
import { ActionSpace, ActionSpaceId } from "./entity/ActionSpace";
import { Resources, ResourceType } from "./entity/Resources";
import { ActionUtils } from "./actionUtils";

export namespace GatherWood {
    const REPLENISH_RESOURCES = {
        ifEmpty: new Resources([[ResourceType.WOOD, 3]]),
        ifNotEmpty: new Resources([[ResourceType.WOOD, 1]]),
    };

    export function execute(game: Game, playerId: PlayerId): EntityMutation<EntityType>[] {
        const actionSpaceId = ActionSpaceId.GATHER_WOOD;
        const player = game.getPlayer(playerId);
        const actionSpace = game.actionBoard.getActionSpace(actionSpaceId);
        return [
            ...ActionUtils.bookActionSpace(actionSpace, player),
            ...ActionUtils.takeResources(actionSpace, player),
        ];
    }

    export function createActionSpace() {
        return new ActionSpace(ActionSpaceId.GATHER_WOOD, execute, REPLENISH_RESOURCES);
    }
}
