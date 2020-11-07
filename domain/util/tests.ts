import { expect } from "chai";
import {
    ActionSpace,
    Dwarf,
    EntityMutation,
    EntityType,
    Game,
    isMutationOfType,
    Mutation,
    Player,
} from "../entity";
import { buildInitialGame } from "../initializeGame";

import { Constructor } from "../../util";

export function expectPlaceDwarf(mutations: EntityMutation[]): void {
    expectMutationsOfType(mutations, Dwarf).toVerifyOnce(
        (mutation) => mutation.diff.isAvailable === false
    );
    expectMutationsOfType(mutations, ActionSpace).toVerifyOnce((mutation) => !!mutation.diff.dwarf);
}

type BaseObjectsForTests = { game: Game; player: Player };

export function buildBaseObjects(): BaseObjectsForTests {
    const game = buildInitialGame();
    const firstPlayer = Array.from(game.players.values())[0];
    return { game: game, player: firstPlayer };
}

type ToVerifyOnce<T> = (check: (mutation: Mutation<T>) => boolean) => void;

export function expectMutationsOfType<T extends EntityType>(
    mutations: EntityMutation[],
    classType: Constructor<T>
): { toVerifyOnce: ToVerifyOnce<T> } {
    const mutationsT = mutations.filter(isMutationOfType(classType));
    return {
        toVerifyOnce: (check: (mutation: Mutation<T>) => boolean) => {
            expect(mutationsT.filter((mutation) => check(mutation))).to.have.lengthOf(1);
        },
    };
}
