export class Resources extends Map<ResourceType, number> {
    isEmpty(): boolean {
        return ![...this.values()].some((quantity: number) => quantity > 0);
    }
    add(resources: Resources) {
        const newResources = new Resources();
        for (const type of Object.values(ResourceType)) {
            newResources.set(type, (this.get(type) || 0) + (resources.get(type) || 0));
        }
        return newResources;
    }
}

export enum ResourceType {
    WOOD = "wood",
    STONE = "stone",
}
