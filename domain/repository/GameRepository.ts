import { EntityMutation, Game } from "../entity";

export interface GameRepository {
    createGame(game: Game): void;

    applyMutation(mutation: EntityMutation): void;
}
