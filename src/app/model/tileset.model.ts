export interface TilesetModel {

    width: number;
    height: number;
    file: string;
    tiles: TileDefinition[];

}

export interface TileDefinition {
    name: string;
    position: {
        x: number;
        y: number;

    },
    price: number;
    tags: string[];
}