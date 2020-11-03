import { expect } from "chai";
import { GatherWood } from "./gatherWood";
import { ActionSpace, buildInitialGame, Dwarf } from "./Game";
import { EntityType, isMutationOfType, Mutation } from "./Mutation";

describe("Gather wood", () => {
    describe("should place a dwarf", () => {
        it("should use a dwarf", () => {
            const { game, player } = buildBaseObjects();

            const mutations = GatherWood.execute(game, player.id);

            expectMutationsOfType(mutations, Dwarf).toVerifyOnce(
                (mutation) => mutation.diff.isAvailable === false
            );
        });

        it("should use an action space", () => {
            const { game, player } = buildBaseObjects();

            const mutations = GatherWood.execute(game, player.id);

            expectMutationsOfType(mutations, ActionSpace).toVerifyOnce(
                (mutation) => !!mutation.diff.dwarf
            );
        });
    });

    it("should gather wood", () => {});

    it("should throw if no dwarf is available", () => {});

    it("should throw if the action space is not available", () => {});

    function buildBaseObjects() {
        const game = buildInitialGame();
        const firstPlayer = Array.from(game.players.values())[0];
        return { game: game, player: firstPlayer };
    }

    function expectMutationsOfType<T extends EntityType>(
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
});
