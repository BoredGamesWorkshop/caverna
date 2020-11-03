import { expect } from "chai";
import { GatherWood } from "./gatherWood";
import { ActionSpace, buildInitialActionBoard, Dwarf, Game, Player } from "./Game";
import { EntityType, isMutationOfType, Mutation } from "./Mutation";

describe("Gather wood", () => {
    describe("should place a dwarf", () => {
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

        it("should use a dwarf", () => {
            const { game, player } = buildBaseObjects({ nbDwarfs: 3 });

            const mutations = GatherWood.execute(game, player.id);

            expectMutationsOfType(mutations, Dwarf).toVerifyOnce(
                (mutation) => mutation.diff.isAvailable === false
            );
        });

        it("should use an action space", () => {
            const { game, player } = buildBaseObjects({ nbDwarfs: 3 });

            const mutations = GatherWood.execute(game, player.id);

            expectMutationsOfType(mutations, ActionSpace).toVerifyOnce(
                (mutation) => !!mutation.diff.dwarf
            );
        });
    });

    it("should gather wood", () => {});

    it("should throw if no dwarf is available", () => {});

    it("should throw if the action space is not available", () => {});

    function buildBaseObjects({ nbDwarfs }: { nbDwarfs: number }) {
        const player = buildPlayer(nbDwarfs);
        const game = new Game(buildInitialActionBoard(), [player]);
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
