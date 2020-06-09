import { GameConfig } from "../game.config";
import Camera from "../model/camera.model";
import { fromIsoCoord } from "./isoMath";

function inBounds(min: number, max: number, value: number) {
    return Math.max(min, Math.min(max, value));
}
export function addMouseListener(obj: HTMLCanvasElement, camera: Camera) {
    let down = false;
    let downPos = { x: 0, y: 0 };

    function getMousePos(evt: MouseEvent) {
        var rect = obj.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    obj.addEventListener('mousemove', e => {
        if (down) {
            const mPos = getMousePos(e);
            camera.x = downPos.x - mPos.x;
            camera.y = downPos.y - mPos.y;
        } else {
            const p = fromIsoCoord({
                x: getMousePos(e).x / camera.zoom + camera.x,
                y: getMousePos(e).y / camera.zoom + camera.y
            });
            GameConfig.mousePosTile.x = p.x + 1;
            GameConfig.mousePosTile.y = p.y;

        }

    });
    obj.addEventListener('mouseup', e => {
        if (e.button === 2) {
            down = false;
        }
    });

    obj.addEventListener('mousedown', e => {
        if (e.button === 2) {
            down = true;
            const mPos = getMousePos(e);
            downPos.x = mPos.x + camera.x;
            downPos.y = mPos.y + camera.y;
            e.stopPropagation();
            e.preventDefault();
        }
    });

    obj.addEventListener('wheel', e => {
        const zoomIn = e.deltaY < 0;
        camera.zoom += zoomIn ? 0.25 : -0.25;
        camera.zoom = inBounds(0.5, 2.5, camera.zoom)
    });

    obj.oncontextmenu = (e) => e.preventDefault();
    document.addEventListener('keydown', (e) => {
        if (e.code === 'KeyG') {
            GameConfig.showGrid = !GameConfig.showGrid;
        }

        if (e.code === 'PageUp') {
            const viewLevels = {
                'low': 'half',
                'half': 'high',
                'high': 'high'
            }
            GameConfig.wallLevel = viewLevels[GameConfig.wallLevel];
        }
        if (e.code === 'PageDown') {
            const viewLevels = {
                'low': 'low',
                'half': 'low',
                'high': 'half'
            }
            GameConfig.wallLevel = viewLevels[GameConfig.wallLevel];
        }
    })
}