import { Dwarf, DwarfId, Player } from "../entity";

export const EntityFactory = {
    createPlayer: createPlayer,
    createDwarfs: createDwarfs,
};

function createPlayer(dwarfsNb: number): Player {
    const player = new Player();
    player.dwarfs = createDwarfs(dwarfsNb);
    return player;
}

function createDwarfs(dwarfsNb: number): Map<DwarfId, Dwarf> {
    const map = new Map<DwarfId, Dwarf>();
    for (let i = 0; i < dwarfsNb; i++) {
        addDwarf();
    }
    return map;

    function addDwarf(): void {
        const dwarf = new Dwarf();
        map.set(dwarf.id, dwarf);
    }
}
