import { Dwarf, PlayerId } from "./Player";
import { EntityType, Mutation } from "./Mutation";
import { Game } from "./Game";
import { Resources } from "./Resources";

export class ActionSpace {
    constructor(id: ActionSpaceId, action: Action, dwarf?: Dwarf) {
        this.id = id;
        this.action = action;
        this.dwarf = dwarf;
        this.resources = new Map();
    }

    id: ActionSpaceId;
    action: Action;
    dwarf?: Dwarf;
    resources: Resources;
}

export enum ActionSpaceId {
    GATHER_WOOD = "gather_wood",
}

export type Action = (game: Game, playerId: PlayerId) => Mutation<EntityType>[];
