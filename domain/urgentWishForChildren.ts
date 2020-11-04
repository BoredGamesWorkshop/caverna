import { PlayerId } from "./entity/Player";
import { EntityType, EntityMutation } from "./entity/Mutation";
import { Game } from "./entity/Game";
import { ActionSpace, ActionSpaceId } from "./entity/ActionSpace";
import { ActionUtils } from "./actionUtils";

export namespace UrgentWishForChildren {
    export function execute(game: Game, playerId: PlayerId): EntityMutation<EntityType>[] {
        const actionSpaceId = ActionSpaceId.URGENT_WISH_FOR_CHILDREN;
        const player = game.getPlayer(playerId);
        const actionSpace = game.actionBoard.getActionSpace(actionSpaceId);
        return [
            ...ActionUtils.bookActionSpace(actionSpace, player),
            ...ActionUtils.giveBirthToDwarf(actionSpace, player),
        ];
    }

    export function createActionSpace() {
        return new ActionSpace(ActionSpaceId.URGENT_WISH_FOR_CHILDREN, execute);
    }
}
