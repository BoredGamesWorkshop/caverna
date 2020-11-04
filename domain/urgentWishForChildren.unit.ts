import { buildBaseObjects, expectMutationsOfType, shouldPlaceDwarf } from "./testUtils";
import { UrgentWishForChildren } from "./urgentWishForChildren";
import { Player } from "./entity/Player";
import { ActionSpace } from "./entity/ActionSpace";

describe("Urgent Wish for Children", () => {
    shouldPlaceDwarf(UrgentWishForChildren.execute);

    it("should add new dwarf to player", function () {
        const { game, player } = buildBaseObjects();
        const playerInitialDwarfsNb = player.dwarfs.size;

        const mutations = UrgentWishForChildren.execute(game, player.id);

        expectMutationsOfType(mutations, Player).toVerifyOnce(
            (mutation) => mutation.diff.dwarfs?.size === playerInitialDwarfsNb + 1
        );
    });

    it("should add new dwarf to action space", function () {
        const { game, player } = buildBaseObjects();

        const mutations = UrgentWishForChildren.execute(game, player.id);

        expectMutationsOfType(mutations, ActionSpace).toVerifyOnce(
            (mutation) => !!mutation.diff.newBornDwarf
        );
    });

    it("new dwarf should be busy", function () {});

    it("should pay for dwelling", function () {});

    it("should add dwelling to player's store", function () {});
});
