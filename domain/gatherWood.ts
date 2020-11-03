import { Game } from "./Game";
import { EntityType, Mutation } from "./Mutation";
import { PlayerId } from "./Player";
import { ActionSpace, ActionSpaceId } from "./ActionSpace";
import { Resources, ResourceType } from "./Resources";

export namespace GatherWood {
    const REPLENISH_RESOURCES = {
        ifEmpty: new Resources([[ResourceType.WOOD, 3]]),
        ifNotEmpty: new Resources([[ResourceType.WOOD, 1]]),
    };

    export function execute(game: Game, playerId: PlayerId): Mutation<EntityType>[] {
        const bookActionSpaceMutations = bookActionSpace(ActionSpaceId.GATHER_WOOD, game, playerId);
        return [...bookActionSpaceMutations];
    }

    function bookActionSpace(
        actionSpaceId: ActionSpaceId,
        game: Game,
        playerId: PlayerId
    ): Mutation<EntityType>[] {
        const player = game.getPlayer(playerId);
        const dwarf = player.getFirstAvailableDwarf();
        return [
            { original: dwarf, diff: { isAvailable: false } },
            { original: game.actionBoard.getActionSpace(actionSpaceId), diff: { dwarf } },
        ];
    }

    export function createActionSpace() {
        return new ActionSpace(ActionSpaceId.GATHER_WOOD, execute, REPLENISH_RESOURCES);
    }
}
