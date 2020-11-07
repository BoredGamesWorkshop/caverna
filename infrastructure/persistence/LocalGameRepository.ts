import { GameRepository } from "../../domain/repository";
import {
    ActionSpace,
    ActionSpaceId,
    Dwarf,
    DwarfId,
    EntityMutation,
    Furnishing,
    FurnishingId,
    Game,
    isMutationOfType,
    Mutation,
    Player,
    PlayerId,
} from "../../domain/entity";
import {
    StoredActionSpace,
    StoredDwarf,
    StoredFurnishing,
    StoredGame,
    StoredPlayer,
} from "./entity/entities";

// Dummy in-memory repository for POC
export class LocalGameRepository implements GameRepository {
    game: StoredGame = new StoredGame();
    actionSpaces: Map<string, StoredActionSpace> = new Map();
    furnishings: Map<string, StoredFurnishing> = new Map();
    players: Map<string, StoredPlayer> = new Map();
    dwarfs: Map<string, StoredDwarf> = new Map();

    applyMutation = (mutation: EntityMutation): void => {
        if (isMutationOfType(ActionSpace)(mutation)) {
            this.updateActionSpace(mutation);
        } else if (isMutationOfType(Player)(mutation)) {
            this.updatePlayer(mutation);
        } else if (isMutationOfType(Dwarf)(mutation)) {
            this.updateDwarf(mutation);
        } else {
            throw Error("Entity type not supported yet!");
        }
    };

    private updateActionSpace = (mutation: Mutation<ActionSpace>) => {
        const actionSpace = this.actionSpaces.get(mutation.original.id) || new StoredActionSpace();
        actionSpace.update(mutation.diff);
        if (mutation.diff.dwarf) this.saveDwarf(mutation.diff.dwarf);
        if (mutation.diff.newBornDwarf) this.saveDwarf(mutation.diff.newBornDwarf);
        this.actionSpaces.set(actionSpace.id, actionSpace);
    };

    private saveActionSpaces = (actionSpaces: Map<ActionSpaceId, ActionSpace>) => {
        [...actionSpaces.values()].forEach((actionSpace) =>
            this.updateActionSpace({ original: actionSpace, diff: actionSpace })
        );
    };

    private updateFurnishing = (mutation: Mutation<Furnishing>) => {
        const furnishing = this.furnishings.get(mutation.original.id) || new StoredFurnishing();
        furnishing.update(mutation.diff);
        this.furnishings.set(furnishing.id, furnishing);
    };

    private saveFurnishings = (furnishings: Map<FurnishingId, Furnishing>) => {
        [...furnishings.values()].forEach((furnishing) =>
            this.updateFurnishing({ original: furnishing, diff: furnishing })
        );
    };

    private updatePlayer = (mutation: Mutation<Player>) => {
        const player = this.players.get(mutation.original.id) || new StoredPlayer();
        player.update(mutation.diff);
        if (mutation.diff.dwarfs) this.saveDwarfs(mutation.diff.dwarfs);
        this.players.set(player.id, player);
    };

    private savePlayers = (players: Map<PlayerId, Player>) => {
        [...players.values()].forEach((player) =>
            this.updatePlayer({ original: player, diff: player })
        );
    };

    private updateDwarf = (mutation: Mutation<Dwarf>) => {
        const dwarf = this.dwarfs.get(mutation.original.id) || new StoredDwarf();
        dwarf.update(mutation.diff);
        this.dwarfs.set(dwarf.id, dwarf);
    };

    private saveDwarfs = (dwarfs: Map<DwarfId, Dwarf>) => {
        [...dwarfs.values()].forEach((dwarf) => this.saveDwarf(dwarf));
    };

    private saveDwarf = (dwarf: Dwarf) => {
        this.updateDwarf({ original: dwarf, diff: dwarf });
    };

    createGame = (game: Game): void => {
        this.game.update(game);
        this.saveActionSpaces(game.actionBoard.actionSpaces);
        this.saveFurnishings(game.furnishingBoard.furnishings);
        this.savePlayers(game.players);
    };
}
