import { Game } from "./entity/Game";
import { EntityType, Mutation } from "./entity/Mutation";
import { Player, PlayerId } from "./entity/Player";
import { ActionSpace, ActionSpaceId } from "./entity/ActionSpace";
import { Resources, ResourceType } from "./entity/Resources";

export namespace GatherWood {
    const REPLENISH_RESOURCES = {
        ifEmpty: new Resources([[ResourceType.WOOD, 3]]),
        ifNotEmpty: new Resources([[ResourceType.WOOD, 1]]),
    };

    export function execute(game: Game, playerId: PlayerId): Mutation<EntityType>[] {
        const actionSpaceId = ActionSpaceId.GATHER_WOOD;
        const player = game.getPlayer(playerId);
        const actionSpace = game.actionBoard.getActionSpace(actionSpaceId);
        return [...bookActionSpace(actionSpace, player), ...takeResources(actionSpace, player)];
    }

    function bookActionSpace(actionSpace: ActionSpace, player: Player): Mutation<EntityType>[] {
        const dwarf = player.getFirstAvailableDwarf();
        return [
            { original: dwarf, diff: { isAvailable: false } },
            { original: actionSpace, diff: { dwarf } },
        ];
    }

    function takeResources(actionSpace: ActionSpace, player: Player): Mutation<EntityType>[] {
        return [
            { original: actionSpace, diff: { resources: new Resources() } },
            { original: player, diff: { resources: player.resources.add(actionSpace.resources) } },
        ];
    }

    export function createActionSpace() {
        return new ActionSpace(ActionSpaceId.GATHER_WOOD, execute, REPLENISH_RESOURCES);
    }
}
