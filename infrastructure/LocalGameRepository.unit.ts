import { expect } from "chai";
import { buildInitialGame } from "../domain/initializeGame";
import { LocalGameRepository } from "./persistence/LocalGameRepository";

describe("LocalRepository", () => {
    it("should not change saved game", function () {
        const game = buildInitialGame();
        const repository = new LocalGameRepository();

        repository.saveGame(game);
        const result = repository.getGame();

        expect(result).to.deep.equal(game);
    });
});
