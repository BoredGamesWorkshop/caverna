import { buildBaseObjects, expectMutationsOfType, shouldPlaceDwarf } from "./testUtils";
import { UrgentWishForChildren } from "./urgentWishForChildren";
import { Dwarf, Player } from "./entity/Player";
import { ActionSpace } from "./entity/ActionSpace";
import { Mutation } from "./entity/Mutation";

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

    describe("new dwarf should be busy", function () {
        it("new player's dwarf should be busy", function () {
            const { game, player } = buildBaseObjects();

            const mutations = UrgentWishForChildren.execute(game, player.id);

            expectMutationsOfType(mutations, Player).toVerifyOnce(
                (mutation) => findNewDwarf(mutation, player)?.isAvailable === false
            );

            function findNewDwarf(
                mutation: Mutation<Player>,
                originalPlayer: Player
            ): Dwarf | undefined {
                const mutationDwarfs = mutation.diff.dwarfs?.values();
                if (typeof mutationDwarfs === "undefined") return undefined;

                return [...mutationDwarfs].find(
                    (dwarf: Dwarf) => originalPlayer.dwarfs?.has(dwarf.id) === false
                );
            }
        });

        it("new action space dwarf should be busy", function () {
            const { game, player } = buildBaseObjects();

            const mutations = UrgentWishForChildren.execute(game, player.id);

            expectMutationsOfType(mutations, ActionSpace).toVerifyOnce(
                (mutation) => mutation.diff.newBornDwarf?.isAvailable === false
            );
        });
    });

    it("should pay for dwelling", function () {});

    it("should add dwelling to player's store", function () {});
});
