import { GameRepository } from "../../domain/repository";
import { EntityMutation, Game } from "../../domain/entity";

export class LocalGameRepository implements GameRepository {
    applyMutation = (mutation: EntityMutation): void => {};

    createGame = (game: Game): void => {};
}
