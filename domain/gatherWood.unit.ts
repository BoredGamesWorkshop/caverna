import { expect } from "chai";
import { gatherWood } from "./gatherWood";
import { Dwarf, Game, Player } from "./Game";
import { Mutation } from "./Mutation";

describe("Gather wood", () => {
    describe("should place a dwarf", () => {
        it("should use a dwarf", () => {
            const { game, player } = buildBaseObjects({ nbDwarfs: 3 });

            const mutations = gatherWood(game, player.id);

            const useDwarfMutations = mutations
                .filter((mutation) => mutation.original instanceof Dwarf)
                .filter((mutation) => (mutation as Mutation<Dwarf>).diff.isAvailable === false);

            expect(useDwarfMutations).to.have.lengthOf(1);
        });

        it("should use an action space", () => {});
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
