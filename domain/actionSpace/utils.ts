import { ActionSpace, Dwarf, EntityMutation, Furnishing, Player, Resources, Tile } from "../entity";

export function bookActionSpace(actionSpace: ActionSpace, player: Player): EntityMutation[] {
    const dwarf = player.getFirstAvailableDwarf();
    return [
        { original: dwarf, diff: { isAvailable: false } },
        { original: actionSpace, diff: { dwarf } },
    ];
}

export function takeResources(actionSpace: ActionSpace, player: Player): EntityMutation[] {
    return [
        { original: actionSpace, diff: { resources: new Resources() } },
        { original: player, diff: { resources: player.resources.add(actionSpace.resources) } },
    ];
}

export function giveBirthToDwarf(actionSpace: ActionSpace, player: Player): EntityMutation[] {
    assertPlayerCanHaveMoreDwarf(player);
    const newDwarf = new Dwarf();
    newDwarf.isAvailable = false;
    const newPlayerDwarfs = new Map(player.dwarfs);
    newPlayerDwarfs.set(newDwarf.id, newDwarf);
    return [
        { original: player, diff: { dwarfs: newPlayerDwarfs } },
        { original: actionSpace, diff: { newBornDwarf: newDwarf } },
    ];
}

function assertPlayerCanHaveMoreDwarf(player: Player) {
    if (player.dwarfs.size >= Player.MAX_DWARFS_NUMBER) {
        throw Error("Max dwarf number reached");
    }
}

export function placeTile(tile: Tile, player: Player): EntityMutation[] {
    return [
        {
            original: player,
            diff: { tilesToPlace: [...player.tilesToPlace, tile] },
        },
    ];
}

export function buyFurnishing(furnishing: Furnishing, player: Player): EntityMutation[] {
    assertPlayerHasEnoughResources(player, furnishing.price);
    return [
        {
            original: player,
            diff: { resources: player.resources.remove(furnishing.price) },
        },
        ...placeTile(furnishing as Tile, player),
    ];

    function assertPlayerHasEnoughResources(player: Player, price: Resources) {
        for (const type of price.keys()) {
            if ((player.resources.get(type) || 0) < (price.get(type) || 0)) {
                throw Error("Not enough resources");
            }
        }
    }
}
