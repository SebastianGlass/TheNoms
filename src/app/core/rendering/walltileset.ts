import { DIRECTIONS } from "./tile.renderer";
import { Tileset } from "./tileset";

function mirror(img: HTMLCanvasElement): HTMLCanvasElement {

    const buffer = document.createElement('canvas');
    buffer.width = img.width;
    buffer.height = img.height;

    const context = buffer.getContext('2d');
    context.scale(-1, 1);
    context.translate(-img.width, 0);

    context.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
    return buffer;

}

function halfWall(img: HTMLCanvasElement) {
    const buffer = document.createElement('canvas');
    buffer.width = img.width;
    buffer.height = img.height;

    const context = buffer.getContext('2d');

    context.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);

    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    //Correct path
    context.moveTo(0, 0);
    context.lineTo(img.width - 5, 0);
    context.lineTo(img.width - 15, img.height - 15 - 8 - 3);
    context.lineTo(0, img.height - 15);
    context.closePath();
    context.fill();
    return buffer;
}

function lowWall(img: HTMLCanvasElement) {
    const buffer = document.createElement('canvas');
    buffer.width = img.width;
    buffer.height = img.height;

    const context = buffer.getContext('2d');

    context.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);

    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    //Correct path
    context.moveTo(0, 0);
    context.lineTo(img.width, 0);
    context.lineTo(img.width, img.height - 15 - 8);
    context.lineTo(0, img.height - 15);
    context.closePath();
    context.fill();
    return buffer;
}
export class WallTileset extends Tileset {



    define(name: string, x: number, y: number, width: number, height: number): void {
        super.define(`${name}`, x, y, width, height);
        this.images[`${name}[mirrored]`] = mirror(this.images[name]);
        this.images[`${name}[low]`] = lowWall(this.images[name]);
        this.images[`${name}[mirrored;low]`] = mirror(lowWall(this.images[name]));
        this.images[`${name}[half]`] = halfWall(this.images[name]);
        this.images[`${name}[mirrored;half]`] = mirror(halfWall(this.images[name]));

    }

    render(name: string, ctx: CanvasRenderingContext2D, x: number, y: number,
        options: { dir: number, wallLevel: string } = { dir: DIRECTIONS.LEFT, wallLevel: 'low' }): void {
        let optString = [
            options.dir == DIRECTIONS.LEFT ? null : 'mirrored',
            options.wallLevel == 'high' ? null : options.wallLevel
        ]
            .filter(a => a != null)
            .join(';');
        if (optString != '') {
            optString = `[${optString}]`;
        }
        ctx.drawImage(this.images[`${name}${optString}`], x + (options.dir == DIRECTIONS.RIGHT ? 16 : 0), y - this.images[name].height + 16);

    }
}