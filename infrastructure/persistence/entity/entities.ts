import {
    Action,
    ActionSpace,
    Dwarf,
    Furnishing,
    Game,
    Player,
    Resources,
    Tile,
} from "../../../domain/entity";
import { Replenishment } from "../../../domain/entity/ActionSpace";

export class StoredGame {
    actionSpaceIds: string[] = [];
    furnishingIds: string[] = [];
    playerIds: string[] = [];

    update(game: Partial<Game>): void {
        if (game.actionBoard) this.actionSpaceIds = [...game.actionBoard.actionSpaces.keys()];
        if (game.furnishingBoard) this.furnishingIds = [...game.furnishingBoard.furnishings.keys()];
        if (game.players) this.playerIds = [...game.players.keys()];
    }
}

export class StoredActionSpace {
    id = "";
    action: Action = () => [];
    dwarfId?: string;
    newBornDwarfId?: string;
    resources: Resources = new Resources();
    replenishment?: Replenishment;

    update(actionSpace: Partial<ActionSpace>): void {
        if (actionSpace.id) this.id = actionSpace.id;
        if (actionSpace.action) this.action = actionSpace.action;
        if (actionSpace.dwarf) this.dwarfId = actionSpace.dwarf?.id;
        if (actionSpace.newBornDwarf) this.newBornDwarfId = actionSpace.newBornDwarf?.id;
        if (actionSpace.resources) this.resources = actionSpace.resources;
        if (actionSpace.replenishment) this.replenishment = actionSpace.replenishment;
    }
}

export class StoredFurnishing {
    id = "";
    price: Resources = new Resources();

    update(furnishing: Partial<Furnishing>): void {
        if (furnishing.id) this.id = furnishing.id;
        if (furnishing.price) this.price = furnishing.price;
    }
}

export class StoredPlayer {
    id = "";
    resources: Resources = new Resources();
    dwarfIds: string[] = [];
    tilesToPlace: Tile[] = [];

    update(player: Partial<Player>): void {
        if (player.id) this.id = player.id;
        if (player.resources) this.resources = player.resources;
        if (player.dwarfs) this.dwarfIds = [...player.dwarfs.keys()];
        if (player.tilesToPlace) this.tilesToPlace = player.tilesToPlace;
    }
}

export class StoredDwarf {
    id = "";
    isAvailable = false;

    update(dwarf: Partial<Dwarf>): void {
        if (dwarf.id) this.id = dwarf.id;
        if (dwarf.isAvailable) this.isAvailable = dwarf.isAvailable;
    }
}
