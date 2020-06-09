import { addMouseListener } from "./core/camera.moving";
import { loadJson } from "./core/loader";
import WorldRenderer from "./core/rendering/world.renderer";
import Timer from "./core/timer";
import { WorldData } from "./model/world.interface";
import { fromData, toData } from "./model/world.mapper";
import { World } from "./model/world.model";

const camera = { x: 0, y: 0, zoom: 1.5 };

async function main(): Promise<void> {

    const canvas = document.getElementById("screen") as HTMLCanvasElement;
    addMouseListener(canvas, camera);

    var ctx = canvas.getContext("2d");
    const world = new World(30, 30);
    for (let i = 12; i <= 17; i++) {
        world.tile[5][i].wallRight = { wallpaperS: 'wallpaper1', wallLevel: "low" };

    }

    for (let i = 5; i <= 16; i++) {
        world.tile[i][18].wallLeft = { wallpaperS: 'wooden_outdoor', wallLevel: "low" };
        if (i < 10)
            world.tile[i][12].wallLeft = { wallpaperS: 'wallpaper1', wallLevel: "low" };
        for (let j = 12; j <= 17; j++) {
            world.tile[i][j].floorTile = 'check floor';
        }

    }
    addRoom(14, 9, 4, 5, world);
    addRoom(14, 14, 4, 3, world);
    addRoom(14 - 9, 14 - 4, 9
        , 7, world);
    const house = await loadJson<WorldData>('house.json');
    const worldLoaded = fromData(house);
    console.log(toData(world));
    const renderer = new WorldRenderer(worldLoaded, camera);
    await renderer.init();
    new Timer(() => renderer.render(ctx), 1 / 60).start();

}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

function addRoom(x, y, ox, oy, world: World) {
    for (let i = x; i < x + ox; i++) {
        for (let j = y; j < y + oy; j++) {
            world.tile[y][i].wallRight = { wallpaperS: 'wallpaper1', wallLevel: "low" };
            world.tile[y + oy][i].wallRight = { wallpaperS: 'wooden_outdoor', wallLevel: "low" };
            world.tile[j][x].wallLeft = { wallpaperS: 'wallpaper1', wallLevel: "low" };
            world.tile[j][x + ox].wallLeft = { wallpaperS: 'wooden_outdoor', wallLevel: "low" };
            world.tile[j][i].floorTile = 'check floor';
        }
    }
}


main();