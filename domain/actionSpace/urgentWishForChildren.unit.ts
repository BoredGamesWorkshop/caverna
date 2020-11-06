import { expect } from "chai";
import { buildBaseObjects, EntityFactory, expectMutationsOfType, expectPlaceDwarf } from "../util";
import { UrgentWishForChildren } from "./urgentWishForChildren";
import {
    ActionSpace,
    Dwarf,
    EntityMutation,
    FurnishingId,
    Game,
    isMutationOfType,
    Mutation,
    Player,
} from "../entity";

describe("Urgent Wish for Children", () => {
    let game: Game;
    let player: Player;

    beforeEach(() => ({ game, player } = buildUrgentWishBaseObjects()));

    it("should place dwarf", function () {
        const mutations = UrgentWishForChildren.execute(game, player.id);

        expectPlaceDwarf(mutations);
    });

    describe("should create and place a new dwarf", () => {
        it("should add new dwarf to player", function () {
            const playerInitialDwarfsNb = player.dwarfs.size;

            const mutations = UrgentWishForChildren.execute(game, player.id);

            expectMutationsOfType(mutations, Player).toVerifyOnce(
                (mutation) => mutation.diff.dwarfs?.size === playerInitialDwarfsNb + 1
            );
        });

        it("should add new dwarf to action space", function () {
            const mutations = UrgentWishForChildren.execute(game, player.id);

            expectMutationsOfType(mutations, ActionSpace).toVerifyOnce(
                (mutation) => !!mutation.diff.newBornDwarf
            );
        });

        it("new dwarf should be the same for player and action space", function () {
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

        it("should throw if player reached max dwarfs number", function () {
            player.dwarfs = EntityFactory.createDwarfs(Player.MAX_DWARFS_NUMBER);

            expect(() => UrgentWishForChildren.execute(game, player.id)).to.throw();
        });

        describe("new dwarf should be busy", function () {
            it("new player's dwarf should be busy", function () {
                const mutations = UrgentWishForChildren.execute(game, player.id);

                expectMutationsOfType(mutations, Player).toVerifyOnce(
                    (mutation) => findNewDwarf(mutation, player)?.isAvailable === false
                );
            });

            it("new action space dwarf should be busy", function () {
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

    describe("should buy dwelling", function () {
        it("should pay for dwelling", function () {
            const mutations = UrgentWishForChildren.execute(game, player.id);

            expectMutationsOfType(mutations, Player).toVerifyOnce(
                (mutation) => mutation.diff.resources?.isEmpty() === true
            );
        });

        it("should throw if player doesn't have enough resources", function () {
            const { game, player } = buildBaseObjects();

            expect(() => UrgentWishForChildren.execute(game, player.id)).to.throw();
        });

        it("should add dwelling to player's store", function () {
            const dwelling = game.furnishingBoard.getFurnishing(FurnishingId.DWELLING);

            const mutations = UrgentWishForChildren.execute(game, player.id);

            expectMutationsOfType(mutations, Player).toVerifyOnce(
                (mutation) => mutation.diff.tilesToPlace?.includes(dwelling) === true
            );
        });
    });

    function buildUrgentWishBaseObjects() {
        const { game, player } = buildBaseObjects();
        initPlayerResources(game, player);
        return { game, player };
    }

    function initPlayerResources(game: Game, player: Player) {
        player.resources = game.furnishingBoard.getFurnishing(FurnishingId.DWELLING).price;
    }
});
