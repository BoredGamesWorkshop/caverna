import { Dwarf, Game, PlayerId } from "./Game";
import { EntityType, Mutation } from "./Mutation";

export function gatherWood(game: Game, playerId: PlayerId): Mutation<EntityType>[] {
    const useDwarfMutation = useDwarf(game, playerId);
    return [useDwarfMutation];
}

function useDwarf(game: Game, playerId: PlayerId): Mutation<Dwarf> {
    const player = game.getPlayer(playerId);
    return {
        original: player.getFirstAvailableDwarf(),
        diff: { isAvailable: false },
    };
}
