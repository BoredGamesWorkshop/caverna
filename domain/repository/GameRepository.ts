import { EntityMutation, Game } from "../entity";

export interface GameRepository {
    saveGame(game: Game): void;

    getGame(): Game;

    applyMutation(mutation: EntityMutation): void;
}
