import { v4 as uuidv4 } from "uuid";
import { Resources } from "./Resources";

export class Player {
    id: PlayerId = uuidv4();
    resources: Resources = new Resources();
    dwarfs: Map<DwarfId, Dwarf> = new Map();

    getFirstAvailableDwarf(): Dwarf {
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
    isAvailable = true;
}

export type DwarfId = string;
