import { Dwarf, PlayerId } from "./Player";
import { EntityType, Mutation } from "./Mutation";
import { Game } from "./Game";

export class ActionSpace {
    constructor(id: ActionSpaceId, action: Action, dwarf?: Dwarf) {
        this.id = id;
        this.action = action;
        this.dwarf = dwarf;
    }

    id: ActionSpaceId;
    action: Action;
    dwarf?: Dwarf;
}

export enum ActionSpaceId {
    GATHER_WOOD = "gather_wood",
}

export type Action = (game: Game, playerId: PlayerId) => Mutation<EntityType>[];
