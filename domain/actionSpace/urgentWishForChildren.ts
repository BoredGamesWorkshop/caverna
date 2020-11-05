import { ActionSpace, ActionSpaceId, EntityMutation, EntityType, Game, PlayerId } from "../entity";
import { bookActionSpace, giveBirthToDwarf } from "./utils";

export const UrgentWishForChildren = {
    execute,
    createActionSpace,
};

function execute(game: Game, playerId: PlayerId): EntityMutation<EntityType>[] {
    const actionSpaceId = ActionSpaceId.URGENT_WISH_FOR_CHILDREN;
    const player = game.getPlayer(playerId);
    const actionSpace = game.actionBoard.getActionSpace(actionSpaceId);
    return [...bookActionSpace(actionSpace, player), ...giveBirthToDwarf(actionSpace, player)];
}

function createActionSpace(): ActionSpace {
    return new ActionSpace(ActionSpaceId.URGENT_WISH_FOR_CHILDREN, execute);
}
