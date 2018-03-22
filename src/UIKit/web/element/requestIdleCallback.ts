export class RequestIdleCallback {

    static isBusy = false

    static queue: { [key: string]: () => void } = {};

    static add(task: () => void, key: string) {
        if (!this.isBusy) {
            task()
        }
        else {
            this.queue[key] = task;
        }
    }

    static consume() {
        for (const key in this.queue) {
            this.queue[key]()
        }
        this.queue = {}
    }

}