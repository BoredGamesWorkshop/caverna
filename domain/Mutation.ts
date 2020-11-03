import { ActionSpace, Dwarf, Player } from "./Game";

export type Mutation<T extends EntityType> = {
    original: T;
    diff: Partial<T>;
};

export function isMutationOfType<T extends EntityType>(classType: { new (): T }) {
    return function (mutation: Mutation<EntityType>): mutation is Mutation<T> {
        return mutation.original instanceof classType;
    };
}

export type EntityType = Player | Dwarf | ActionSpace;
