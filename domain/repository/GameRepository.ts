import { EntityMutation, Game } from "../entity";

export interface GameRepository {
    saveGame(game: Game): void;

    applyMutation(mutation: EntityMutation): void;
}
