import { Dwarf, PlayerId } from "./Player";
import { EntityMutation, EntityType } from "./Mutation";
import { Game } from "./Game";
import { Resources } from "./Resources";

export class ActionSpace {
    constructor(id: ActionSpaceId, action: Action, replenishment?: Replenishment, dwarf?: Dwarf) {
        this.id = id;
        this.action = action;
        this.dwarf = dwarf;
        this.resources = new Resources();
        this.replenishment = replenishment;
    }

    id: ActionSpaceId;
    action: Action;
    dwarf?: Dwarf;
    resources: Resources;
    replenishment?: Replenishment;
}

export enum ActionSpaceId {
    GATHER_WOOD = "gather_wood",
}

export type Action = (game: Game, playerId: PlayerId) => EntityMutation<EntityType>[];

export type Replenishment = {
    ifEmpty: Resources;
    ifNotEmpty: Resources;
};

export function replenish(actionSpace: ActionSpace) {
    if (typeof actionSpace.replenishment === "undefined") return;

    if (actionSpace.resources.isEmpty()) {
        return { original: actionSpace, diff: { resources: actionSpace.replenishment.ifEmpty } };
    } else {
        return {
            original: actionSpace,
            diff: { resources: actionSpace.resources.add(actionSpace.replenishment.ifNotEmpty) },
        };
    }
}
