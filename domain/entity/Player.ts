import { v4 as uuidv4 } from "uuid";
import { Resources } from "./Resources";
import { Tile } from "./Furnishing";
import { toIdMap } from "../util";

export class Player {
    constructor(
        id: PlayerId = uuidv4(),
        resources: Resources = new Resources(),
        dwarfs: Dwarf[] = [],
        tilesToPlace: Tile[] = []
    ) {
        this.id = id;
        this.resources = resources;
        this.dwarfs = toIdMap(dwarfs, (dwarf) => dwarf.id);
        this.tilesToPlace = tilesToPlace;
    }

    static MAX_DWARFS_NUMBER = 5;

    id: PlayerId;
    resources: Resources;
    dwarfs: Map<DwarfId, Dwarf>;
    tilesToPlace: Tile[];

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
    constructor(id: string = uuidv4(), isAvailable = true) {
        this.id = id;
        this.isAvailable = isAvailable;
    }

    id: DwarfId;
    isAvailable = true;
}

export type DwarfId = string;
