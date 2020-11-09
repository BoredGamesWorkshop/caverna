import { Resources } from "./Resources";

export class Tile {
    constructor(id: TileId) {
        this.id = id;
    }
    id: TileId;
}

export type TileId = CavernId | FurnishingId;

export function assertIsTile(tile: unknown): asserts tile is Tile {
    if (!(tile instanceof Tile)) {
        throw new Error("Internal error: Invalid argument");
    }
}

export enum CavernId {
    CAVERN_TUNNEL = "CavernTunnel",
    CAVERN_CAVERN = "CavernCavern",
}

export class Furnishing extends Tile {
    constructor(id: FurnishingId, price: Resources) {
        super(id);
        this.price = price;
    }
    id!: FurnishingId;
    price: Resources;
}

export enum FurnishingId {
    DWELLING = "dwelling",
}
