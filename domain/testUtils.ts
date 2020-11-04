import { EntityType, isMutationOfType, Mutation } from "./entity/Mutation";
import { expect } from "chai";
import { buildInitialGame } from "./initializeGame";
import { Action, ActionSpace } from "./entity/ActionSpace";
import { Dwarf } from "./entity/Player";

export function shouldPlaceDwarf(action: Action) {
    describe("should place a dwarf", () => {
        it("should use a dwarf", () => {
            const { game, player } = buildBaseObjects();

            const mutations = action(game, player.id);

            expectMutationsOfType(mutations, Dwarf).toVerifyOnce(
                (mutation) => mutation.diff.isAvailable === false
            );
        });

        it("should use an action space", () => {
            const { game, player } = buildBaseObjects();

            const mutations = action(game, player.id);

            expectMutationsOfType(mutations, ActionSpace).toVerifyOnce(
                (mutation) => !!mutation.diff.dwarf
            );
        });
    });
}

export function buildBaseObjects() {
    const game = buildInitialGame();
    const firstPlayer = Array.from(game.players.values())[0];
    return { game: game, player: firstPlayer };
}

export function expectMutationsOfType<T extends EntityType>(
    mutations: Mutation<EntityType>[],
    classType: { new (...arg: any): T }
) {
    const mutationsT = mutations.filter(isMutationOfType(classType));
    return {
        toVerifyOnce: (check: (mutation: Mutation<T>) => boolean) => {
            expect(mutationsT.filter((mutation) => check(mutation))).to.have.lengthOf(1);
        },
    };
}
