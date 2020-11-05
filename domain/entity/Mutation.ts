import { Dwarf, Player } from "./Player";
import { ActionSpace } from "./ActionSpace";

export type EntityType = Player | Dwarf | ActionSpace;

type Mutation<T> = {
    original: T;
    diff: Partial<T>;
};

/*
  Note TS:

  Mutation<EntityPlayer> was not satisfying because it doesn't narrow down the type of T to Player, Dwarf & co. It checks
  that both `original` and `diff` are respectively based from any EntityType but not that they are based from the same
  entity subtype

  We would rather be interested in "Mutation<Player> | Mutation<Dwarf> | ..." so we created DiscriminateUnion<EntityType>
  (that is equivalent to that) to replace Mutation<EntityType>

  The problem is that in the type guard "mutation is Mutation<T>", the type predicate's type (Mutation<T>)
  must be assignable to its parameter's type (Mutation<Player> | Mutation<Dwarf> | ...). And it doesn't work when T is
  equal to EntityType as Mutation<EntityType> is not included in (Mutation<Player> | Mutation<Dwarf> | ...) for the
  reasons explained previously.

  To fix that, we want to explicitly remove the case Mutation<EntityType>. We achieved that by creating a new type
  EntityMutation<T> that is an intersection of Mutation<T> and DiscriminateUnion<EntityType>. And that way, everything
  works ;)
 */
type DiscriminateUnion<T> = T extends any ? Mutation<T> : never;
export type EntityMutation<T> = DiscriminateUnion<EntityType> & Mutation<T>;

export function isMutationOfType<T extends EntityType>(classType: { new (): T }) {
    return function (mutation: EntityMutation<EntityType>): mutation is EntityMutation<T> {
        return mutation.original instanceof classType;
    };
}
