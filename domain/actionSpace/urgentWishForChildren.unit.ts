import { buildBaseObjects, expectMutationsOfType, shouldPlaceDwarf } from "../util";
import { UrgentWishForChildren } from "./urgentWishForChildren";
import { ActionSpace, Dwarf, EntityMutation, isMutationOfType, Mutation, Player } from "../entity";
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

            const actionSpaceDwarf = getActionSpaceNewDwarf(mutations);
            const playerDwarf = getPlayerNewDwarf(mutations, player);

            expect(actionSpaceDwarf).to.deep.equal(playerDwarf);
        });

        function getActionSpaceNewDwarf(mutations: EntityMutation[]) {
            const actionSpaceMutation = mutations
                .filter(isMutationOfType(ActionSpace))
                .filter((mutation) => mutation.diff.newBornDwarf)[0];
            return actionSpaceMutation?.diff?.newBornDwarf;
        }

        function getPlayerNewDwarf(mutations: EntityMutation[], player: Player) {
            const playerMutation = mutations
                .filter(isMutationOfType(Player))
                .filter((mutation) => mutation.diff.dwarfs)[0];

            return findNewDwarf(playerMutation, player);
        }

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

    it("should pay for dwelling", function () {});

    it("should add dwelling to player's store", function () {});
});
