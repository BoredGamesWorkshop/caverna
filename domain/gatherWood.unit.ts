import { expect } from "chai";
import { gatherWood } from "./gatherWood";
import { ActionSpace, Dwarf, Game, Player } from "./Game";
import { EntityType, isMutationOfType, Mutation } from "./Mutation";

describe("Gather wood", () => {
    describe("should place a dwarf", () => {
        function expectMutationsOfType<T extends EntityType>(
            mutations: Mutation<EntityType>[],
            classType: { new (): T }
        ) {
            const mutationsT = mutations.filter(isMutationOfType(classType));
            return {
                toVerifyOnce: (check: (mutation: Mutation<T>) => boolean) => {
                    expect(mutationsT.filter((mutation) => check(mutation))).to.have.lengthOf(1);
                },
            };
        }

        it("should use a dwarf", () => {
            const { game, player } = buildBaseObjects({ nbDwarfs: 3 });

            const mutations = gatherWood(game, player.id);

            expectMutationsOfType(mutations, Dwarf).toVerifyOnce(
                (mutation) => mutation.diff.isAvailable === false
            );
        });

        it("should use an action space", () => {
            const { game, player } = buildBaseObjects({ nbDwarfs: 3 });

            const mutations = gatherWood(game, player.id);

            expectMutationsOfType(mutations, ActionSpace).toVerifyOnce(
                (mutation) => !!mutation.diff.dwarf
            );
        });
    });

    it("should gather wood", () => {});

    it("should throw if no dwarf is available", () => {});

    it("should throw if the action space is not available", () => {});

    function buildBaseObjects({ nbDwarfs }: { nbDwarfs: number }) {
        const game = new Game();
        const player = buildPlayer(nbDwarfs);
        game.players.set(player.id, player);
        return { game, player };
    }

    function buildPlayer(nbDwarfs: number): Player {
        const player = new Player();
        for (let i = 0; i < nbDwarfs; i++) {
            addDwarf();
        }
        return player;

        function addDwarf() {
            const dwarf = new Dwarf();
            player.dwarfs.set(dwarf.id, dwarf);
        }
    }
});
