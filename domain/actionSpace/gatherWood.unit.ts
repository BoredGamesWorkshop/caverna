import { expect } from "chai";
import { GatherWood } from "./gatherWood";
import {
    ActionSpace,
    ActionSpaceId,
    Dwarf,
    Game,
    Player,
    Resources,
    ResourceType,
} from "../entity";
import { buildBaseObjects, expectMutationsOfType, expectPlaceDwarf } from "../util";

describe("Gather wood", () => {
    let game: Game;
    let player: Player;

    beforeEach(() => ({ game, player } = buildBaseObjects()));

    it("should place dwarf", function () {
        const mutations = GatherWood.execute(game, player.id);

        expectPlaceDwarf(mutations);
    });

    describe("should gather wood", () => {
        it("should add wood to the player's resources", () => {
            addWood(game, 2);

            const mutations = GatherWood.execute(game, player.id);

            expectMutationsOfType(mutations, Player).toVerifyOnce(
                (mutation) => mutation.diff.resources?.get(ResourceType.WOOD) === 2
            );
        });

        it("should remove action space's wood", () => {
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
        makeAllDwarfsBusy();

        expect(() => GatherWood.execute(game, player.id)).to.throw();

        function makeAllDwarfsBusy() {
            player.dwarfs.forEach((dwarf) => (dwarf.isAvailable = false));
        }
    });

    it("should throw if the action space is not available", () => {
        addAnotherDwarfOnActionSpace();

        expect(() => GatherWood.execute(game, player.id)).to.throw;

        function addAnotherDwarfOnActionSpace() {
            game.actionBoard.getActionSpace(ActionSpaceId.GATHER_WOOD).dwarf = new Dwarf();
        }
    });
});
