import { Dwarf, Player } from "./Game";

export type Mutation<T extends EntityType> = {
    original: T;
    diff: Partial<T>;
};

export type EntityType = Player | Dwarf;
