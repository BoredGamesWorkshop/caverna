import { Dwarf, Player } from "./Player";
import { ActionSpace } from "./ActionSpace";

export type EntityType = Player | Dwarf | ActionSpace;

type Mutation<T> = {
    original: T;
    diff: Partial<T>;
};

/*
  Note TS: EntityMutation is equivalent to Mutation<Player> | Mutation<Dwarf> | ...

  Mutation<EntityPlayer> is not satisfying because it doesn't narrow down the type of T to Player, Dwarf & co
  It checks that both `original` and `diff` are respectively based from any EntityType
  but not that they are based from the same entity subtype
 */
type DiscriminateUnion<T> = T extends any ? Mutation<T> : never;
export type EntityMutation = DiscriminateUnion<EntityType>;

export function isMutationOfType<T extends EntityType>(classType: { new (): T }) {
    return function (mutation: Mutation<EntityType>): mutation is Mutation<T> {
        return mutation.original instanceof classType;
    };
}
