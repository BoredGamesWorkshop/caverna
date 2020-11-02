import { v4 as uuidv4 } from "uuid";

export class Game {
    actionBoard: ActionBoard = new ActionBoard();
    players: Map<PlayerId, Player> = new Map();

    getPlayer(id: PlayerId) {
        const player = this.players.get(id);
        if (typeof player === "undefined") {
            throw new Error("Internal Error: Player not found");
        }
        return player;
    }
}

export class ActionBoard {}

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
