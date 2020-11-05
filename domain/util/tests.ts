import {
    Action,
    ActionSpace,
    Dwarf,
    EntityMutation,
    EntityType,
    Game,
    isMutationOfType,
    Player,
} from "../entity";
import { expect } from "chai";
import { buildInitialGame } from "../initializeGame";
import { Constructor } from "./Constructor";

export function shouldPlaceDwarf(action: Action): void {
    describe("should place a dwarf", () => {
        it("should use a dwarf", () => {
            const { game, player } = buildBaseObjects();

            const mutations = action(game, player.id);

            expectMutationsOfType(mutations, Dwarf).toVerifyOnce(
                (mutation) => mutation.diff.isAvailable === false
            );
        });

        it("should use an action space", () => {
            const { game, player } = buildBaseObjects();

            const mutations = action(game, player.id);

            expectMutationsOfType(mutations, ActionSpace).toVerifyOnce(
                (mutation) => !!mutation.diff.dwarf
            );
        });
    });
}

type BaseObjectsForTests = { game: Game; player: Player };

export function buildBaseObjects(): BaseObjectsForTests {
    const game = buildInitialGame();
    const firstPlayer = Array.from(game.players.values())[0];
    return { game: game, player: firstPlayer };
}

type ToVerifyOnce<T> = (check: (mutation: EntityMutation<T>) => boolean) => void;

export function expectMutationsOfType<T extends EntityType>(
    mutations: EntityMutation<EntityType>[],
    classType: Constructor<T>
): { toVerifyOnce: ToVerifyOnce<T> } {
    const mutationsT = mutations.filter(isMutationOfType(classType));
    return {
        toVerifyOnce: (check: (mutation: EntityMutation<T>) => boolean) => {
            expect(mutationsT.filter((mutation) => check(mutation))).to.have.lengthOf(1);
        },
    };
}
