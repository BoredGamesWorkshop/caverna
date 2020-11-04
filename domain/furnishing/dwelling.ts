import { Resources, ResourceType } from "../entity/Resources";
import { Furnishing, FurnishingId } from "../entity/Furnishing";

export namespace Dwelling {
    const PRICE = new Resources([
        [ResourceType.WOOD, 4],
        [ResourceType.STONE, 3],
    ]);

    export function createFurnishing(): Furnishing {
        return new Furnishing(FurnishingId.DWELLING, PRICE);
    }
}
