import { v4 as uuidv4 } from "uuid";
import { GatherWood } from "./gatherWood";
import { EntityType, Mutation } from "./Mutation";

export class Game {
    constructor(actionBoard: ActionBoard, players: Player[]) {
        this.actionBoard = actionBoard;
        this.players = new Map(players.map((player: Player) => [player.id, player]));
    }
    actionBoard: ActionBoard = new ActionBoard([]);
    players: Map<PlayerId, Player> = new Map();

    getPlayer(id: PlayerId) {
        const player = this.players.get(id);
        if (typeof player === "undefined") {
            throw new Error("Internal Error: Player not found");
        }
        return player;
    }
}

export class ActionBoard {
    constructor(actionSpaces: ActionSpace[]) {
        this.actionSpaces = new Map(
            actionSpaces.map((actionSpace: ActionSpace) => [actionSpace.id, actionSpace])
        );
    }
    actionSpaces: Map<ActionSpaceId, ActionSpace> = new Map();

    getActionSpace(id: ActionSpaceId) {
        const actionSpace = this.actionSpaces.get(id);
        if (typeof actionSpace === "undefined") {
            throw new Error("Internal Error: Action space not found");
        }
        return actionSpace;
    }
}

export function buildInitialActionBoard() {
    return new ActionBoard([GatherWood.createActionSpace()]);
}

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

export class Player {
    id: PlayerId = uuidv4();
    dwarfs: Map<DwarfId, Dwarf> = new Map();

    getFirstAvailableDwarf() {
        const availableDwarfs = Array.from(this.dwarfs.values()).filter(
            (dwarf) => dwarf.isAvailable
        );
        if (availableDwarfs.length === 0) {
            throw new Error("No dwarf available");
        }
        return availableDwarfs[0];
    }
}
export type PlayerId = string;

export class Dwarf {
    id: DwarfId = uuidv4();
    isAvailable: boolean = true;
}

export type DwarfId = string;
