import { Dwarf, Player } from "./Player";
import { ActionSpace } from "./ActionSpace";

export type EntityType = Player | Dwarf | ActionSpace;

type Mutation<T> = {
    original: T;
    diff: Partial<T>;
};

// DiscriminateUnion<EntityType> is equivalent to Mutation<Player> | Mutation<Dwarf> | ...
// It doesn't include the type Mutation<EntityType> that allows "original" and "diff" attributes of different EntityType
type DiscriminateUnion<T> = T extends any ? Mutation<T> : never;

// The problem is that Mutation<T> is not included in DiscriminateUnion<EntityType> because of Mutation<EntityType>
// and so we can't use the type guard below to narrow the type of Mutation<T> (see https://github.com/microsoft/TypeScript/issues/24935)
// To fix that, we create a new type with an intersection to exclude Mutation<EntityType>
export type EntityMutation<T> = DiscriminateUnion<EntityType> & Mutation<T>;

export function isMutationOfType<T extends EntityType>(classType: { new (): T }) {
    return function (mutation: EntityMutation<EntityType>): mutation is EntityMutation<T> {
        return mutation.original instanceof classType;
    };
}
