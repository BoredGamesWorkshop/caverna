import { ActionSpace, ActionSpaceId, EntityMutation, Game, PlayerId } from "../entity";
import { bookActionSpace } from "./utils";

export const Excavation = {
    execute,
    createActionSpace,
};

export function execute(game: Game, playerId: PlayerId): EntityMutation[] {
    const player = game.getPlayer(playerId);
    const actionSpace = game.actionBoard.getActionSpace(ActionSpaceId.EXCAVATION);
    return [...bookActionSpace(actionSpace, player)];
}

function createActionSpace(): ActionSpace {
    return new ActionSpace(ActionSpaceId.EXCAVATION, execute);
}
