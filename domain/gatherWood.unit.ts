import { expect } from "chai";
import { GatherWood } from "./gatherWood";
import { EntityType, isMutationOfType, Mutation } from "./Mutation";
import { Dwarf, Player } from "./Player";
import { ActionSpace, ActionSpaceId } from "./ActionSpace";
import { buildInitialGame } from "./initializeGame";
import { Resources, ResourceType } from "./Resources";
import { Game } from "./Game";

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

    describe("should gather wood", () => {
        it("should add wood to the player's resources", () => {
            const { game, player } = buildBaseObjects();
            addWood(game, 2);

            const mutations = GatherWood.execute(game, player.id);

            expectMutationsOfType(mutations, Player).toVerifyOnce(
                (mutation) => mutation.diff.resources?.get(ResourceType.WOOD) === 2
            );
        });

        it("should remove action space's wood", () => {
            const { game, player } = buildBaseObjects();
            addWood(game, 3);

            const mutations = GatherWood.execute(game, player.id);

            expectMutationsOfType(mutations, ActionSpace).toVerifyOnce(
                (mutation) => mutation.diff.resources?.isEmpty() === true
            );
        });

        function addWood(game: Game, woodNb: number) {
            const actionSpace = game.actionBoard.getActionSpace(ActionSpaceId.GATHER_WOOD);
            actionSpace.resources = actionSpace.resources.add(
                new Resources([[ResourceType.WOOD, woodNb]])
            );
        }
    });

    it("should throw if no dwarf is available", () => {
        const { game, player } = buildBaseObjects();
        makeAllDwarfsBusy();

        expect(() => GatherWood.execute(game, player.id)).to.throw;

        function makeAllDwarfsBusy() {
            player.dwarfs.forEach((dwarf) => (dwarf.isAvailable = false));
        }
    });

    it("should throw if the action space is not available", () => {
        const { game, player } = buildBaseObjects();
        addAnotherDwarfOnActionSpace();

        expect(() => GatherWood.execute(game, player.id)).to.throw;

        function addAnotherDwarfOnActionSpace() {
            game.actionBoard.getActionSpace(ActionSpaceId.GATHER_WOOD).dwarf = new Dwarf();
        }
    });

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
