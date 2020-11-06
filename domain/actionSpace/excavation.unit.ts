import { Excavation } from "./excavation";
import { ActionSpace, ActionSpaceId, Game, Player, Resources, ResourceType } from "../entity";
import { buildBaseObjects, expectMutationsOfType, shouldPlaceDwarf } from "../util";
import { expect } from "chai";

describe("Excavation", () => {
    shouldPlaceDwarf(Excavation.execute);

    describe("should gather the stone", () => {
        it("should add wood to the player's resources", () => {
            const { game, player } = buildBaseObjects();
            addStoneToActionSpace(game, 2);

            const mutations = Excavation.execute(game, player.id);

            expectMutationsOfType(mutations, Player).toVerifyOnce(
                (mutation) => mutation.diff.resources?.get(ResourceType.WOOD) === 2
            );
        });

        it("should remove action space's wood", () => {
            const { game, player } = buildBaseObjects();
            addStoneToActionSpace(game, 3);

            const mutations = Excavation.execute(game, player.id);

            expectMutationsOfType(mutations, ActionSpace).toVerifyOnce(
                (mutation) => mutation.diff.resources?.isEmpty() === true
            );
        });

        function addStoneToActionSpace(game: Game, nbStone: number) {
            const actionSpace = game.actionBoard.getActionSpace(ActionSpaceId.GATHER_WOOD);
            actionSpace.resources = actionSpace.resources.add(
                new Resources([[ResourceType.STONE, nbStone]])
            );
        }
    });

    describe("should place a tile", () => {
        it("should place a CavernTunnel tile", () => {
            expect(false).to.be.ok; //TODO: implement this test
        });

        it("should place a CavernCavern tile", () => {
            expect(false).to.be.ok; //TODO: implement this test
        });
    });
});
