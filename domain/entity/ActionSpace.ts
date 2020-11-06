import { Dwarf, PlayerId } from "./Player";
import { EntityMutation, Mutation } from "./Mutation";
import { Game } from "./Game";
import { Resources } from "./Resources";

export class ActionSpace {
    constructor(
        id: ActionSpaceId,
        action: Action,
        replenishment?: Replenishment,
        dwarf?: Dwarf,
        newBornDwarf?: Dwarf
    ) {
        this.id = id;
        this.action = action;
        this.dwarf = dwarf;
        this.newBornDwarf = newBornDwarf;
        this.resources = new Resources();
        this.replenishment = replenishment;
    }

    id: ActionSpaceId;
    action: Action;
    dwarf?: Dwarf;
    newBornDwarf?: Dwarf;
    resources: Resources;
    replenishment?: Replenishment;
}

export enum ActionSpaceId {
    GATHER_WOOD = "gather_wood",
    URGENT_WISH_FOR_CHILDREN = "urgent_wish_for_children",
    EXCAVATION = "excavation",
}

export type Action = (game: Game, playerId: PlayerId) => EntityMutation[];

export type Replenishment = {
    ifEmpty: Resources;
    ifNotEmpty: Resources;
};

export function replenish(actionSpace: ActionSpace): Mutation<ActionSpace>[] {
    if (typeof actionSpace.replenishment === "undefined") return [];

    if (actionSpace.resources.isEmpty()) {
        return [{ original: actionSpace, diff: { resources: actionSpace.replenishment.ifEmpty } }];
    } else {
        return [
            {
                original: actionSpace,
                diff: {
                    resources: actionSpace.resources.add(actionSpace.replenishment.ifNotEmpty),
                },
            },
        ];
    }
}
