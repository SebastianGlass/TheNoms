import { GameConfig } from "../../game.config";
import Camera from "../../model/camera.model";
import { World } from "../../model/world.model";
import { toIsoCoord } from "../isoMath";
import { loadImage } from "../loader";
import TileRenderer from "./tile.renderer";
import { FloorTileset, loadTileset } from "./tileset";
import { WallTileset } from "./walltileset";


//Walls are not tildeable currently
const tilde = 0;

export interface ImgReg {
    floors: FloorTileset;
    walls: WallTileset;
    [key: string]: any;
}




export default class WorldRenderer {

    xMax: number;
    yMax: number;
    tileRenderer: TileRenderer;
    screen: HTMLCanvasElement;

    constructor(private world: World, private camera: Camera) {
        this.xMax = world.xMax;
        this.yMax = world.yMax;
        this.screen = document.createElement('canvas');
        this.screen.width = GameConfig.resolution.width * 2;
        this.screen.height = GameConfig.resolution.height * 2;

    }

    async init(): Promise<void> {
        const floors = await loadTileset('tiles/floors.json', img => new FloorTileset(img));
        const walls = await loadTileset('tiles/walls.json', img => new WallTileset(img));
        const wall_cursor = await loadImage('img/wall_cursor.png');
        const imgReg: ImgReg = {
            floors,
            walls,
            wall_cursor
        };
        this.tileRenderer = new TileRenderer(imgReg);
    }

    toIsoCoord(p) {
        const u = toIsoCoord(p);
        u.x -= this.camera.x;
        u.y -= this.camera.y;
        return u;
    }

    render(target: CanvasRenderingContext2D): void {
        const ctx = this.screen.getContext("2d");
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0,
            GameConfig.resolution.width * this.camera.zoom,
            GameConfig.resolution.height * this.camera.zoom);
        for (let x = 0; x < this.xMax; x++) {
            for (let y = 0; y < this.yMax; y++) {
                this.tileRenderer
                    .onTile(ctx, this.world.tile[x][y])
                    .renderFloor({ ...this.toIsoCoord({ x, y }), orgX: x, orgY: y });
            }
        }
        for (let x = 0; x < this.xMax; x++) {
            for (let y = 0; y < this.yMax; y++) {
                this.tileRenderer
                    .onTile(ctx, this.world.tile[x][y])
                    .renderWall({ ...this.toIsoCoord({ x, y }), orgX: x, orgY: y });
            }
        }
        for (let x = 0; x < this.xMax; x++) {
            for (let y = 0; y < this.yMax; y++) {
                this.tileRenderer
                    .onTile(ctx, this.world.tile[x][y])
                    .renderCursor({ ...this.toIsoCoord({ x, y }), orgX: x, orgY: y });
            }
        }
        target.fillStyle = "#000000";
        target.fillRect(0, 0, GameConfig.resolution.width, GameConfig.resolution.height);
        target.drawImage(this.screen, 0, 0,
            this.screen.width * this.camera.zoom,
            this.screen.height * this.camera.zoom);
    }
}