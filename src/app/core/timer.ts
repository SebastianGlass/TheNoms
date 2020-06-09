export default class Timer {
    lastTime = 0;
    accumulatedTime = 0;
    stopRequest = false;

    constructor(
        private updateFunc: (dt: number) => void,
        private deltaTime = 1 / 60
    ) { }

    updateProxy(time: number): void {
        this.accumulatedTime += (time - this.lastTime) / 1000;
        if (this.accumulatedTime > 1) {
            this.accumulatedTime = 1;
            console.warn('resolve sleeping');
        }
        while (this.accumulatedTime > this.deltaTime) {
            this.update(this.deltaTime);

            this.accumulatedTime -= this.deltaTime;
        }
        this.lastTime = time;
        this.enqueue();
    }

    update(deltaTime: number): void {
        if (this.updateFunc) {
            this.updateFunc(deltaTime);
        }
    }

    enqueue(): void {
        if (!this.stopRequest) requestAnimationFrame(time => this.updateProxy(time));
    }
    start(): void {
        this.enqueue();
    }

    stop(): void {
        this.stopRequest = true;
    }
}