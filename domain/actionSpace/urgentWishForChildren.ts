import {
    ActionSpace,
    ActionSpaceId,
    EntityMutation,
    FurnishingId,
    Game,
    PlayerId,
} from "../entity";
import { bookActionSpace, buyFurnishing, giveBirthToDwarf } from "./utils";

export const UrgentWishForChildren = {
    execute,
    createActionSpace,
};

function execute(game: Game, playerId: PlayerId): EntityMutation[] {
    const actionSpaceId = ActionSpaceId.URGENT_WISH_FOR_CHILDREN;
    const player = game.getPlayer(playerId);
    const actionSpace = game.actionBoard.getActionSpace(actionSpaceId);
    const dwelling = game.furnishingBoard.getFurnishing(FurnishingId.DWELLING);

    return [
        ...bookActionSpace(actionSpace, player),
        ...giveBirthToDwarf(actionSpace, player),
        ...buyFurnishing(dwelling, player),
    ];
}

function createActionSpace(): ActionSpace {
    return new ActionSpace(ActionSpaceId.URGENT_WISH_FOR_CHILDREN, execute);
}
