import { Excavation } from "./excavation";
import { ActionSpace, ActionSpaceId, Game, Player, Resources, ResourceType, Tile } from "../entity";
import { buildBaseObjects, expectMutationsOfType, expectPlaceDwarf } from "../util";
import { CavernId } from "../entity/Tile";
import { GatherWood } from "./gatherWood";

describe("Excavation", () => {
    let game: Game;
    let player: Player;

    beforeEach(() => ({ game, player } = buildBaseObjects()));

    it("should place dwarf", function () {
        const mutations = GatherWood.execute(game, player.id);

        expectPlaceDwarf(mutations);
    });

    describe("should gather the stone", () => {
        it("should add stone to the player's resources", () => {
            addStoneToActionSpace(game, 5);

            const mutations = Excavation.execute(game, player.id, [
                new Tile(CavernId.CAVERN_TUNNEL),
            ]);

            expectMutationsOfType(mutations, Player).toVerifyOnce(
                (mutation) => mutation.diff.resources?.get(ResourceType.STONE) === 5
            );
        });

        it("should remove action space's stone", () => {
            addStoneToActionSpace(game, 5);

            const mutations = Excavation.execute(game, player.id, [
                new Tile(CavernId.CAVERN_TUNNEL),
            ]);

            expectMutationsOfType(mutations, ActionSpace).toVerifyOnce(
                (mutation) => mutation.diff.resources?.isEmpty() === true
            );
        });

        function addStoneToActionSpace(game: Game, nbStone: number) {
            const actionSpace = game.actionBoard.getActionSpace(ActionSpaceId.EXCAVATION);
            actionSpace.resources = actionSpace.resources.add(
                new Resources([[ResourceType.STONE, nbStone]])
            );
        }
    });

    describe("should place a tile", () => {
        it("should place a CavernTunnel tile", () => {
            const mutations = Excavation.execute(game, player.id, [
                new Tile(CavernId.CAVERN_TUNNEL),
            ]);

            expectMutationsOfType(mutations, Player).toVerifyOnce(
                (mutation) =>
                    !!mutation.diff.tilesToPlace?.filter(
                        (tile) => tile.id === CavernId.CAVERN_TUNNEL
                    )
            );
        });

        it("should place a CavernCavern tile", () => {
            const mutations = Excavation.execute(game, player.id, [
                new Tile(CavernId.CAVERN_CAVERN),
            ]);

            expectMutationsOfType(mutations, Player).toVerifyOnce(
                (mutation) =>
                    !!mutation.diff.tilesToPlace?.filter(
                        (tile) => tile.id === CavernId.CAVERN_CAVERN
                    )
            );
        });
    });
});
