import { Resources } from "./Resources";

export class Tile {}

export class Furnishing extends Tile {
    constructor(id: FurnishingId, price: Resources) {
        super();
        this.id = id;
        this.price = price;
    }

    id: FurnishingId;
    price: Resources;
}

export enum FurnishingId {
    DWELLING = "dwelling",
}
