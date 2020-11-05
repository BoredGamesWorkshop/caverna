import { Furnishing, FurnishingId, Resources, ResourceType } from "../entity";

export namespace Dwelling {
    const PRICE = new Resources([
        [ResourceType.WOOD, 4],
        [ResourceType.STONE, 3],
    ]);

    export function createFurnishing(): Furnishing {
        return new Furnishing(FurnishingId.DWELLING, PRICE);
    }
}
