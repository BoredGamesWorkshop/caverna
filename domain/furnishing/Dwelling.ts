import { Furnishing, FurnishingId, Resources, ResourceType } from "../entity";

export const Dwelling = { createFurnishing };

const PRICE = new Resources([
    [ResourceType.WOOD, 4],
    [ResourceType.STONE, 3],
]);

export function createFurnishing(): Furnishing {
    return new Furnishing(FurnishingId.DWELLING, PRICE);
}
