import { Animation } from "./animation";
import { Scroller } from "./scroller";

export class Paging extends Animation {

    readonly fromOffset: { x: number, y: number }

    constructor(scroller: Scroller, readonly toOffset: { x: number, y: number }, private velocity: { x: number, y: number }) {
        super(scroller)
        this.fromOffset = { ...scroller.delegate.contentOffset }
        let xVelocity = (toOffset.x > this.fromOffset.x) ? Math.max(1.0, velocity.x) : Math.min(-1.0, velocity.x)
        if (toOffset.x == this.fromOffset.x) {
            xVelocity = 0.0
        }
        else {
            while (
                ((toOffset.x > this.fromOffset.x) && this.fromOffset.x + (xVelocity / (1 - scroller.accelerationRate)) * (1.0 - Math.exp(-(1.0 - scroller.accelerationRate) * Infinity)) < toOffset.x) ||
                ((toOffset.x < this.fromOffset.x) && this.fromOffset.x + (xVelocity / (1 - scroller.accelerationRate)) * (1.0 - Math.exp(-(1.0 - scroller.accelerationRate) * Infinity)) > toOffset.x)) {
                xVelocity *= 1.1
            }
        }
        let yVelocity = (toOffset.y > this.fromOffset.y) ? Math.max(1.0, velocity.y) : Math.min(-1.0, velocity.y)
        if (toOffset.y == this.fromOffset.y) {
            yVelocity = 0.0
        }
        else {
            while (
                ((toOffset.y > this.fromOffset.y) && this.fromOffset.y + (yVelocity / (1 - scroller.accelerationRate)) * (1.0 - Math.exp(-(1.0 - scroller.accelerationRate) * Infinity)) < toOffset.y) ||
                ((toOffset.y < this.fromOffset.y) && this.fromOffset.y + (yVelocity / (1 - scroller.accelerationRate)) * (1.0 - Math.exp(-(1.0 - scroller.accelerationRate) * Infinity)) > toOffset.y)) {
                yVelocity *= 1.1
            }
        }
        this.velocity = { x: xVelocity, y: yVelocity }
    }

    animate(): boolean {
        const deltaTime = Animation.currentTime() - this.beginTime
        const oldContentOffset = this.scroller.delegate.contentOffset
        const nextContentOffset = {
            x: this.fromOffset.x + (this.velocity.x / (1 - this.scroller.accelerationRate)) * (1.0 - Math.exp(-(1.0 - this.scroller.accelerationRate) * deltaTime)),
            y: this.fromOffset.y + (this.velocity.y / (1 - this.scroller.accelerationRate)) * (1.0 - Math.exp(-(1.0 - this.scroller.accelerationRate) * deltaTime)),
        }
        if (this.toOffset.x > this.fromOffset.x && nextContentOffset.x > this.toOffset.x) {
            nextContentOffset.x = this.toOffset.x
        }
        else if (this.toOffset.x < this.fromOffset.x && nextContentOffset.x < this.toOffset.x) {
            nextContentOffset.x = this.toOffset.x
        }
        if (this.toOffset.y > this.fromOffset.y && nextContentOffset.y > this.toOffset.y) {
            nextContentOffset.y = this.toOffset.y
        }
        else if (this.toOffset.y < this.fromOffset.y && nextContentOffset.y < this.toOffset.y) {
            nextContentOffset.y = this.toOffset.y
        }
        this.scroller.delegate.contentOffset = nextContentOffset
        return Math.abs(nextContentOffset.x - oldContentOffset.x) < 0.1 && Math.abs(nextContentOffset.y - oldContentOffset.y) < 0.1
    }

}