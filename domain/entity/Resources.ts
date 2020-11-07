export class Resources extends Map<ResourceType, number> {
    isEmpty(): boolean {
        return ![...this.values()].some((quantity: number) => quantity > 0);
    }

    add = (resources: Resources): Resources => {
        return this.combine(resources, (selfValue, newValue) => selfValue + newValue);
    };

    remove = (resources: Resources): Resources => {
        return this.combine(resources, (selfValue, newValue) => selfValue - newValue);
    };

    private combine = (
        resources: Resources,
        method: (selfValue: number, newValue: number) => number
    ): Resources => {
        const newResources = new Resources();
        for (const type of Object.values(ResourceType)) {
            newResources.set(type, method(this.get(type) || 0, resources.get(type) || 0));
        }
        return newResources;
    };
}

export enum ResourceType {
    WOOD = "wood",
    STONE = "stone",
}
