import { TilesetModel } from "../../model/tileset.model";
import { loadImage, loadJson } from "../loader";

export async function loadTileset(url: string, tilesetConst = img => new Tileset(img)): Promise<Tileset> {
    const json = await loadJson<TilesetModel>(url);
    const img = await loadImage(json.file);

    const tileset = tilesetConst(img);
    json.tiles.forEach(tile =>
        tileset.define(tile.name, tile.position.x * json.width,
            tile.position.y * json.height,
            json.width,
            json.height)
    );
    return tileset;
}

export class Tileset {
    protected images: { [key: string]: HTMLCanvasElement } = {};

    constructor(protected sourceImg: HTMLImageElement) { }


    protected copyImage(x: number, y: number, width: number, height: number): HTMLCanvasElement {
        const buffer = document.createElement('canvas');
        buffer.width = width;
        buffer.height = height;
        const context = buffer.getContext('2d');
        context.drawImage(this.sourceImg, x, y, width, height, 0, 0, width, height);
        return buffer;
    }
    define(name: string, x: number, y: number, width: number, height: number): void {

        this.images[name] = this.copyImage(x, y, width, height);
    }

    render(name: string, ctx: CanvasRenderingContext2D, x: number, y: number): void {
        ctx.drawImage(this.images[name], x, y);
    }
}

export class FloorTileset extends Tileset {

    define(name: string, x: number, y: number, width: number, height: number): void {
        super.define(name, x, y, width, height);
        const buffer = this.copyImage(x, y, width, height);
        const context = buffer.getContext('2d');
        context.beginPath();
        context.strokeStyle = "#555555";
        context.moveTo(0, 8);
        context.lineTo(16, 0);
        context.lineTo(32, 8);
        context.stroke();
        this.images[name + "[grid=true]"] = buffer;
    }

    render(name: string, ctx: CanvasRenderingContext2D, x: number, y: number, options: { grid: boolean } = { grid: false }): void {
        if (options.grid) {
            ctx.drawImage(this.images[name + "[grid=true]"], x, y);
        } else
            ctx.drawImage(this.images[name], x, y);
    }
}
