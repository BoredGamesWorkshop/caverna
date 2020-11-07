import { Dwarf, Player } from "./Player";
import { ActionSpace } from "./ActionSpace";
import { Constructor } from "../../util";

export type EntityType = Player | Dwarf | ActionSpace;

export type Mutation<T> = {
    original: T;
    diff: Partial<T>;
};

// EntityMutation is equivalent to Mutation<Player> | Mutation<Dwarf> | ...
// It doesn't include the type Mutation<EntityType> that allows "original" and "diff" attributes of different EntityType
type DiscriminateUnion<T> = T extends EntityType ? Mutation<T> : never;
export type EntityMutation = DiscriminateUnion<EntityType>;

// The problem is that Mutation<T> is not included in DiscriminateUnion<EntityType> because of Mutation<EntityType>
// and so we can't use the type guard below to narrow the type of Mutation<T> (see https://github.com/microsoft/TypeScript/issues/24935)
// To fix that, we add an intersection to exclude Mutation<EntityType>
export function isMutationOfType<T extends EntityType>(classType: Constructor<T>) {
    return function (mutation: EntityMutation): mutation is Mutation<T> & EntityMutation {
        return mutation.original instanceof classType;
    };
}
