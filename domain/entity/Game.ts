import { Player, PlayerId } from "./Player";
import type { ActionSpace, ActionSpaceId } from "./ActionSpace";

export class Game {
    constructor(actionBoard: ActionBoard, players: Player[]) {
        this.actionBoard = actionBoard;
        this.players = new Map(players.map((player: Player) => [player.id, player]));
    }
    actionBoard: ActionBoard = new ActionBoard([]);
    players: Map<PlayerId, Player> = new Map();

    getPlayer(id: PlayerId): Player {
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

    getActionSpace(id: ActionSpaceId): ActionSpace {
        const actionSpace = this.actionSpaces.get(id);
        if (typeof actionSpace === "undefined") {
            throw new Error("Internal Error: Action space not found");
        }
        return actionSpace;
    }
}
