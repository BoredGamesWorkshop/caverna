import { v4 as uuidv4 } from "uuid";
import { Resources } from "./getResources";

export class Player {
    id: PlayerId = uuidv4();
    resources: Resources = new Resources();
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

export function buildInitialPlayer(): Player {
    const DWARFS_NUMBER = 2;
    const player = new Player();
    for (let i = 0; i < DWARFS_NUMBER; i++) {
        addDwarf();
    }
    return player;

    function addDwarf() {
        const dwarf = new Dwarf();
        player.dwarfs.set(dwarf.id, dwarf);
    }
}
export type PlayerId = string;

export class Dwarf {
    id: DwarfId = uuidv4();
    isAvailable: boolean = true;
}

export type DwarfId = string;
