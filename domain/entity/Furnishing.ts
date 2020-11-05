import { Resources } from "./Resources";

export class Furnishing {
    constructor(id: FurnishingId, price: Resources) {
        this.id = id;
        this.price = price;
    }

    id: FurnishingId;
    price: Resources;
}

export enum FurnishingId {
    DWELLING = "dwelling",
}
