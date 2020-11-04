import { buildBaseObjects, expectMutationsOfType, shouldPlaceDwarf } from "./testUtils";
import { UrgentWishForChildren } from "./urgentWishForChildren";
import { Dwarf, Player } from "./entity/Player";
import { ActionSpace } from "./entity/ActionSpace";
import { EntityMutation, isMutationOfType } from "./entity/Mutation";
import { expect } from "chai";

describe("Urgent Wish for Children", () => {
    shouldPlaceDwarf(UrgentWishForChildren.execute);

    describe("should create and place a new dwarf", () => {
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

        it("new dwarf should be the same for player and action space", function () {
            const { game, player } = buildBaseObjects();

            const mutations = UrgentWishForChildren.execute(game, player.id);

            const actionSpaceMutation = mutations
                .filter(isMutationOfType(ActionSpace))
                .filter((mutation) => mutation.diff.newBornDwarf)[0];
            const playerMutation = mutations
                .filter(isMutationOfType(Player))
                .filter((mutation) => mutation.diff.dwarfs)[0];

            const actionSpaceDwarf = actionSpaceMutation?.diff?.newBornDwarf;
            const playerDwarf = findNewDwarf(playerMutation, player);

            expect(playerDwarf).to.exist;
            expect(actionSpaceMutation).to.exist;
            expect(actionSpaceDwarf).to.deep.equal(playerDwarf);
        });

        describe("new dwarf should be busy", function () {
            it("new player's dwarf should be busy", function () {
                const { game, player } = buildBaseObjects();

                const mutations = UrgentWishForChildren.execute(game, player.id);

                expectMutationsOfType(mutations, Player).toVerifyOnce(
                    (mutation) => findNewDwarf(mutation, player)?.isAvailable === false
                );
            });

            it("new action space dwarf should be busy", function () {
                const { game, player } = buildBaseObjects();

                const mutations = UrgentWishForChildren.execute(game, player.id);

                expectMutationsOfType(mutations, ActionSpace).toVerifyOnce(
                    (mutation) => mutation.diff.newBornDwarf?.isAvailable === false
                );
            });
        });

        function findNewDwarf(
            mutation: EntityMutation<Player>,
            originalPlayer: Player
        ): Dwarf | undefined {
            const mutationDwarfs = mutation.diff.dwarfs?.values();
            if (typeof mutationDwarfs === "undefined") return undefined;
            return [...mutationDwarfs].find(
                (dwarf: Dwarf) => originalPlayer.dwarfs?.has(dwarf.id) === false
            );
        }
    });

    it("should pay for dwelling", function () {});

    it("should add dwelling to player's store", function () {});
});
